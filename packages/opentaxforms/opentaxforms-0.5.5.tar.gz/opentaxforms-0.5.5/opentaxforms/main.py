#! /usr/bin/env python
# -*- coding: utf-8 -*-

'''
  main

  glossary
    eg means 'such as'
    trailing z pluralizes, eg chrz=characters
    pos,poz=position,positions
'''
from __future__ import print_function, absolute_import
import sys
from os import remove as removeFile
import traceback

from . import ut, irs, link, schema, html, refs as references
from .ut import log, jj, Bag, logg, stdout, Qnty, pathjoin
from .config import cfg, setup, RecurseInfinitely
from .extractFillableFields import extractFields


def cleanup_files(form):
    '''remove intermediate files'''
    prefix = form.prefix
    if 'c' in cfg.steps:
        rawXmlFname = pathjoin(cfg.dirName, '{}-text.xml'.format(prefix))
        fmtXmlFname = pathjoin(cfg.dirName, '{}-fmt.xml'.format(prefix))
        if ut.exists(rawXmlFname):
            removeFile(rawXmlFname)
        if ut.exists(fmtXmlFname):
            removeFile(fmtXmlFname)


def addFormsTodo(form, formsdone, formstodo, formsfail):
    from opentaxforms.Form import Form
    recurselevel = form.recurselevel
    refs = form.refs
    if cfg.recurse and (cfg.maxrecurselevel == RecurseInfinitely or
                        recurselevel < cfg.maxrecurselevel):
        newforms = set(refs.keys()) \
            .difference(formsdone) \
            .difference(set(form for form, reclevel in formstodo)) \
            .difference(set(formsfail))
        formstodo.extend(Form(f, 1 + recurselevel) for f in newforms)
        if ut.hasdups(formstodo, lambda form: form.name):
            raise Exception('formstodo hasdups')
    return formstodo


def mathStatus(computedFields):
    # computedFields are computed from other, dependent fields If a computed
    # field has no dependencies, either its dependencies are missing or the
    # field isnt really computed [a bug either way]. This is a coarse measure--
    # even a perfect score could mask incorrect dependency lists.
    nComputedFieldsWithDeps = sum(1 for f in computedFields.values() if f[
        'deps'])
    nComputedFieldsSansDeps = sum(1 for f in computedFields.values() if not f[
        'deps'])
    return nComputedFieldsWithDeps, nComputedFieldsSansDeps


def layoutStatus(fields):
    def overlap(f1, f2):
        # where f1,f2 are fields
        bb1 = ut.Bbox(
            int(f1['xpos'].magnitude),
            int(f1['ypos'].magnitude),
            int(f1['xpos'].magnitude) + int(f1.get('xdim', Qnty(0)).magnitude),
            int(f1['ypos'].magnitude) + int(f1.get('ydim', Qnty(0)).magnitude))
        bb2 = ut.Bbox(
            int(f2['xpos'].magnitude),
            int(f2['ypos'].magnitude),
            int(f2['xpos'].magnitude) + int(f2.get('xdim', Qnty(0)).magnitude),
            int(f2['ypos'].magnitude) + int(f2.get('ydim', Qnty(0)).magnitude))
        return not(
            bb1.x1 <= bb2.x0 or  # box1 is to the left of box2
            bb1.x0 >= bb2.x1 or  # box1 is to the right of box2
            bb1.y0 >= bb2.y1 or  # box1 is below box2
            bb1.y1 <= bb2.y0)

    # box1 is above box2
    def overlaps(field, fieldz):
        # returns true if field overlaps w/ any in fieldz n-squared loop is v
        # slow! todo compute fieldNeighbors on adjacent lines to limit loop in
        # layoutStatus/overlaps
        for f in fieldz:
            if overlap(f, field):
                return True
        return False
    if cfg.computeOverlap:
        nOverlappingFields = sum(
            overlaps(f, fields[i:]) for i, f in enumerate(fields))
        nNonoverlappingFields = len(fields) - nOverlappingFields
        return nNonoverlappingFields, nOverlappingFields
    else:
        nFields = len(fields)
        return nFields, -100


statusmsgtmpl = 'layoutBoxes: {}found,{}overlapping,?missing,?spurious;' \
                ' refs: {}found,{}unrecognized,?missing,?spurious;' \
                ' computedFields: {}found,{}empty,?missing,?spurious'


def logFormStatus(form):
    z = Bag()
    z.lgood, z.lerrs = layoutStatus(form.fields)
    z.rgood, z.rerrs = form.refs.status() if form.refs else (0, 0)
    z.mgood, z.merrs = mathStatus(form.computedFields)

    def neg2unkn(lst):
        return [l if l > 0 else '?' for l in lst]
    statusmsg = 'form {} status: '.format(form.name) + statusmsgtmpl.format(
        *neg2unkn(z(*('lgood', 'lerrs', 'rgood', 'rerrs', 'mgood', 'merrs')))
        )
    logg(statusmsg, [log.warn, stdout])
    return z.__dict__


def logRunStatus(formsdone, formsfail, status):
    if len(formsdone) > 1:
        print('successfully processed {} forms'.format(len(formsdone)))
        statusTotals = sum(status.values(), Bag())
        msg = 'status totals:' + statusmsgtmpl.format(
              *statusTotals(*'lgood lerrs rgood rerrs mgood merrs'.split()))
        logg(msg, [log.warn, stdout])
    if formsfail:
        msg = 'failed to process %d forms: %s' % (
              len(formsfail), [irs.computeFormId(f) for f in formsfail])
        logg(msg, [log.error, stdout])
    import json
    status.update({'f' + irs.computeFormId(f).lower(): None
                  for f in formsfail})
    statusStr = json.dumps(status.__dict__)
    # status is partial because missing,spurious values are unknown and thus
    # omitted
    log.warn('status partial data: %s' % (statusStr))


def indicateProgress(form):
    def guessFormPrefix(form):
        try:
            f,sched=form.name
            sched='' if sched is None else 's'+sched.lower()
        except ValueError:
            f=form.name
            sched=''
        return 'f'+f+sched
    log.name=guessFormPrefix(form)
    if cfg.indicateProgress:
        msg = '--------' + jj(
              form.name,
              ('recurselevel=%d' % (form.recurselevel) if cfg.recurse else ''))
        logg(msg, [stdout, log.warn])
        # use warn level so that transition to new form is logged by default


def opentaxforms(**args):
    setup(**args)

    formstodo, formsdone, formsfail = [], [], []
    formstodo.extend(cfg.formsRequested)
    status = Bag()
    failurls = ut.unpickle('failurls', set())

    while formstodo:
        form = formstodo.pop(0)
        indicateProgress(form)
        try:
            form.getFile(failurls)
            form.readInfo()
            extractFields(form)
            form.fixBugs()
            link.linkfields(form)
            form.computeMath()
            references.findRefs(form)
            schema.writeFormToDb(form)
            html.writeEmptyHtmlPages(form)
        except irs.CrypticXml as e:
            # eg 1040 older than 2012 fails here
            log.error(jj('EEEError', e.__class__.__name__, str(e)))
            formsfail.append(form.name)
        except Exception as e:
            log.error(jj('EEEError', traceback.format_exc()))
            if cfg.debug:
                raise
            formsfail.append(form.name)
        else:
            formsdone.append(form)
            formstodo = addFormsTodo(form, formsdone, formstodo, formsfail)
            status[form.prefix] = logFormStatus(form)
            cleanup_files(form)
    logRunStatus(formsdone, formsfail, status)
    ut.pickle(failurls, 'failurls')
    atLeastSomeFormsSucceeded = (len(formsdone) > 0)
    Success = 0
    Failure = 1
    return Success if atLeastSomeFormsSucceeded else Failure


if __name__ == '__main__':
    setup(readCmdlineArgs=True)
    if cfg.doctests:
        import doctest
        doctest.testmod(verbose=cfg.verbose)
    else:
        sys.exit(opentaxforms())
