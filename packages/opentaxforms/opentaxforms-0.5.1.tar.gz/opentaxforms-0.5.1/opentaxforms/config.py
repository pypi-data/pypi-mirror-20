
import sys
from argparse import ArgumentParser
import opentaxforms.ut as ut
from opentaxforms.ut import log, Bag, setupLogging, logg, NL
from opentaxforms.version import appname, appversion

RecurseInfinitely = -1
RecursionRootLevel = 0
SkippableSteps = (
    ut.ChainablyUpdatableOrderedDict()
    (x='xfaParsing')
    (m='mathParsing')
    (r='referenceParsing')
    (d='databaseOutput')
    (h='htmlOutput')
    (c='cleanupFiles')) # remove intermediate files

defaults = Bag(dict(
    # todo separate dirName into pdfInputDir,htmlOutputDir
    #      pdfInputDir='pdf', htmlOutputDir='html',
    dirName='forms',
    checkFileList=True,
    computeOverlap=True,
    debug=False,
    rootForms=None,
    formyear=None,
    useCaches=False,
    # todo for latestTaxYear, check irs-prior url for latest f1040 pdf, tho
    # could be incomplete eg during dec2016 the 2016 1040 and 400ish other
    # forms are ready but not schedule D and 200ish others
    latestTaxYear=2016,
    loglevel='warn',
    logPrefix=None,
    maxrecurselevel=RecurseInfinitely,
    okToDownload=True,
    # todo replace postgres option with dbpath/dburl
    postgres=False,
    quiet=False,
    readCmdlineArgs=False,
    recurse=False,
    relaxRqmts=False,
    skip=[],
    verbose=False,
    version=False,
))
cfg = Bag(defaults)


def parseCmdline():
    '''Load command line arguments'''
    parser = ArgumentParser(
        description='Automates tax forms and provides an API'
                    ' for new tax form interfaces;'
                    ' must specify either form or directory option'
        )
    addarg = parser.add_argument
    addarg('-f', '--form', dest='rootForms', nargs='?',
           help='forms to parse, eg f1040 or f1040sa,f1040sab')
    # disallowing --year option for now the code currently assumes all forms
    # are available at irs-prior/ [the collection of all past forms] for each
    # year, eg f1040--2015.pdf; but some forms arent revised every year, so eg
    # the most recent 8903 is f8903--2010.pdf and indeed that's the revision
    # seen in irs-pdf/ [the current set of forms for tax year 2016]; fixing
    # this is very doable* but not worthwhile unless users request past-year
    # functionality.  [f8903 is referenced at f1040/line35]
    # *very doable: eg for "--year 2015", either
    # 1. attempt to download each url from f8903--2015 on back to f8903--2010
    # 2. OR download entire listing of irs-prior/
    #    and use latest 8903 year not-greater-than 2015
    # addarg('-y', # '--year', dest='formyear', nargs='?',
    #    default=defaults.latestTaxYear,
    #    help='form year, used only if forms will be downloaded, defaults to
    #    latestTaxYear; eg 2013')
    addarg('-d', '--directory', dest='dirName', default=defaults.
           dirName, nargs='?', help='directory of form files to parse')
    addarg('-l', '--loglevel', help='set loglevel',
           default=defaults.loglevel, dest='LOG_LEVEL')
    addarg('-T', '--doctests', help='run doctests',
           action="store_true")
    addarg('-v', '--verbose',
           help='log more [only affects doctests]', action="store_true")
    addarg('-g', '--debug', help='debug', action="store_true")
    addarg('-D', '--dontDownload', dest='okToDownload',
           help='report error for forms not present locally',
           action="store_false")
    addarg('-q', '--quiet', help='suppress stdout',
           action="store_true")
    addarg('-r', '--recurse',
           help='recurse thru all referenced forms', action="store_true")
    addarg('-R', '--recurselevel', type=int,
           help='number of levels to recurse thru, defaults to infinite',
           dest='maxrecurselevel', default=defaults.maxrecurselevel)
    addarg('-k', '--skip', nargs='?', default=[],
           help='steps to skip, can be any combination of: ' + ' '.join(
           '='.join((k, v)) for k, v in SkippableSteps.items()), dest='skip')
    addarg('-C', '--useCaches',
           help='recompute cached intermediate results', action="store_true")
    addarg('-P', '--postgres',
           help='use postgres database [default=sqlite]', action="store_true")
    addarg('-V', '--version', help='report version and exit',
           default=False, action="store_true")
    addarg('--calledFromCmdline',
           help='signals that script is run from commandline', default=True)
    return parser.parse_args()


def getFileList(dirName):
    # todo replace this section in task formDictionary
    allpdfpath = '{dirName}/allpdfnames.txt'.format(**vars())
    if not ut.exists(allpdfpath):
        if 1:  # until resolve urllib2 code below
            allpdfpath = ut.Resource(appname, 'static/allpdfnames.txt').path()
            allpdfLink = dirName + '/allpdfnames.txt'
            if not ut.exists(allpdfLink):
                from os import symlink
                symlink(allpdfpath, allpdfLink)
        elif not cfg.okToDownload:
            msg = 'allPdfNames file [%s] not found but dontDownload' % (
                allpdfpath)
            raise Exception(msg)
        else:
            # todo why did this stop working?  my own env?
            from urllib2 import urlopen, URLError
            try:
                # could use https://www.irs.gov/pub/irs-pdf/pdfnames.txt but
                # this way we avoid errors in that file
                fin = urlopen('https://www.irs.gov/pub/irs-pdf/', 'rb')
                if fin.getcode() != 200:
                    raise Exception('getFileList/urlopen/getcode=[%d]' % (
                        fin.getcode(), ))
                allpdffiles_html = fin.read()
                fin.close()
                import re
                allpdfnames = re.findall(r'f[\w\d-]+\.pdf', allpdffiles_html)
                allpdfnames = ut.uniqify(sorted(allpdfnames))
                with open(allpdfpath, 'w') as f:
                    f.write(NL.join(allpdfnames))
            except URLError, e:
                log.error(e)
                log.error('Apparently the IRS website changed. '
                          ' Seek: "expert interface to locating PDF documents.'
                          ' f11c.pdf f23.pdf f23ep.pdf"'
                          )
                raise
    with open(allpdfpath) as f:
        cfg.allpdfnames = [line.strip().rsplit('.', 1)[0] for line in f]


alreadySetup = False


def setup(**overrideArgs):
    from os import makedirs, symlink
    # note formyear will default to latestTaxYear even if dirName=='2014'
    global alreadySetup
    if alreadySetup:
        return
    args = None
    if overrideArgs.get('readCmdlineArgs'):
        args = parseCmdline()
        cfg.update((args, lambda x: x.__dict__.items()))
    if cfg.version:
        print appversion
        sys.exit()
    for k, v in overrideArgs.items():
        cfg[k] = v
    if not cfg.quiet and args is not None:
        logg('commandlineArgs:' + str(args), [ut.stdout])
    if cfg.quiet:
        ut.quiet = True
    if cfg.debug:
        cfg.loglevel = 'DEBUG'
        cfg.verbose = True
    if 'steps' in cfg:
        if cfg.steps and len(cfg.steps[0]) > 1:
            assert len(cfg.steps) == 1
            cfg.steps = cfg.steps[0].split()
    else:
        cfg.steps = [step for step in SkippableSteps if step not in cfg.skip]
    if cfg.formyear is None:
        cfg.formyear = cfg.latestTaxYear
    dirName = cfg.dirName
    if cfg.rootForms:
        rootForms = [f.strip() for f in cfg.rootForms.split(',')]
    else:
        rootForms=['']
    if cfg.logPrefix:
        logname=cfg.logPrefix
    elif rootForms:
        logname = rootForms[0]
        if len(rootForms) > 1:
            logname += 'etc'
    elif dirName:
        logname = dirName.replace('/', '_').strip('._')
    else:
        logname = appname
    loginfo = setupLogging(logname, cfg)
    cfg.logfilename = loginfo
    cfg.log = log
    if not cfg.quiet:
        logg('logfilename is "{}"'.format(cfg.logfilename))
        log.warn('commandline: %s at %s', ' '.join(sys.argv), ut.now())

    if dirName is not None:
        from opentaxforms.Form import Form
        if rootForms:
            cfg.formsRequested = [
                Form(rootForm, RecursionRootLevel) for rootForm in rootForms]
        else:
            from os import listdir
            from os.path import isfile, join as joinpath
            cfg.formsRequested = [
                Form(f, RecursionRootLevel)
                for f in listdir(dirName)
                if isfile(joinpath(dirName, f)) and f.lower().endswith('.pdf')]
        if not cfg.formsRequested and not cfg.relaxRqmts:
            raise Exception(
                'must specify either a form via -f'
                ' or a directory with form pdf files via -d'
                )
        cfg.indicateProgress = cfg.recurse or len(cfg.formsRequested) > 1

        # log entire config .before. getFileList makes it huge
        logg('config:' + str(cfg), [log.warn])

        import os
        if not ut.exists(dirName):
            makedirs(dirName)
        staticDir = ut.Resource(appname, 'static').path()
        staticLink = dirName + '/static'
        import os.path
        if not os.path.lexists(staticLink):
            symlink(staticDir, staticLink)

        if cfg.checkFileList:
            getFileList(dirName)

    alreadySetup = True


def unsetup():
    global alreadySetup
    alreadySetup = False
    # clear cfg but preserve logfilename
    logfilename=cfg.logfilename
    cfg.clear()
    cfg.update(defaults)
    cfg.logfilename=logfilename
    #ut.unsetupLogging()  # continue using same log setup


if __name__ == "__main__":
    setup()
    if cfg.doctests:
        import doctest
        doctest.testmod(verbose=cfg.verbose)
