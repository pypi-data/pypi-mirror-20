"""P4Python - Python interface to Perforce API

Perforce is the fast SCM system at www.perforce.com.
This package provides a simple interface from Python wrapping the
Perforce C++ API to gain performance and ease of coding.
Similar to interfaces available for Ruby and Perl.

"""
from __future__ import print_function

classifiers = """\
Development Status :: 5 - Production/Stable
Intended Audience :: Developers
License :: Freely Distributable
Programming Language :: Python
Topic :: Software Development :: Libraries :: Python Modules
Topic :: Software Development :: Version Control
Topic :: Software Development
Topic :: Utilities
Operating System :: Microsoft :: Windows
Operating System :: Unix
Operating System :: MacOS :: MacOS X
"""

# Customisations needed to use to build:
# 1. Set directory for p4api in setup.cfg

# See notes in P4API documentation for building with API on different
# platforms:
#   http://www.perforce.com/perforce/doc.current/manuals/p4api/02_clientprog.html

MIN_SSL_VERSION=100
# MIN_SSL_RELEASE='e' # currently not restricting builds for any OpenSSL > 1.0.0

try:
    from setuptools import setup, Extension
except ImportError:
    from distutils.core import setup, Extension

import os, os.path, sys, re, shutil, stat
import platform
import tarfile
import tempfile
from ftplib import FTP, error_perm
import itertools
import subprocess

if sys.version_info < (3,0):
    from ConfigParser import ConfigParser
else:
    from configparser import ConfigParser

global_dist_directory = "p4python-"

PERFORCE_FTP = 'ftp.perforce.com'
# user is anonymous, no need to log on with a special user

class P4APIFtp:
    def __init__(self):
        self.ftp = FTP(PERFORCE_FTP)
        self.pattern = re.compile(r'(?P<permissions>[ld-][r-][w-][x-][r-][w-][x-][r-][w-][x-])' +\
                                  r'\s+\d+\s+\w+\s+\w+\s+\d+\s+' +\
                                  r'(?P<date>\S+\s+\S+\s+\S+)\s+' +\
                                  r'(?P<name>.+)')
        self.platform = self.findPlatform

    @property
    def findPlatform(self):
        """
        We are looking for out platform following the Perforce naming standard,
        i.e. bin.xxxyyy
        :return: the platform we are on
        """

        architecture = platform.architecture()[0] # 32bit or 64bit
        machine = platform.machine()
        system = platform.system()
        uname = platform.uname()

        platform_str = "bin."

        if system == "Linux":
            platform_str += "linux26"
            if machine in [ 'i386', 'i586', 'i686', 'x86']:
                platform_str += "x86"
            elif machine in [ 'x86_64', 'amd64']:
                platform_str += "x86_64"
            elif machine in [ 'armv6l']:
                platform_str += 'armhf'
            else:
                raise Exception("Unknown machine {}. Please configure P4API manually".format(machine))

        elif system == "Windows":
            platform_str = platform_str + "NT"
            if architecture == "32bit":
                platform_str += "X86"
            else:
                platform_str += "X64"

        elif system == "Darwin":
            platform_str = platform_str + "darwin90" + machine

        elif system == "FreeBSD":
            platform_str += "freebsd"
            release = uname.release

            value = int(''.join(itertools.takewhile(lambda s: s.isdigit(), release)))

            if value >= 10:
                platform_str += "100"
                if machine == 'amd64':
                    platform_str += "x86_64"
                elif machine == 'i386':
                    platform_str += "x86"
                else:
                    raise Exception("Unknown machine {}. Please configure P4API manually".format(machine))


        else:
            raise Exception("System {} is not supported for automatic download. Please configure P4API manually".format(system))

        return platform_str

    def sortedDirectories(self, dirs):
        # first, extract the directory names from the list output
        names = [ self.pattern.match(x).group('name') for x in dirs ]

        # sort them by date, avoiding the Y2K problem
        sorted_names = sorted(names, key=lambda x : '19' + x if x[1] == '9' else '20' + x, reverse=True )

        return sorted_names

    def descend(self, d):
        pwd = self.ftp.pwd()
        apidir = None
        tar = None
        
        try:
            self.ftp.cwd(d)
            self.ftp.cwd(self.platform)

            p4api = 'p4api.tgz'
            tempdir = tempfile.gettempdir()
            filename = os.path.join(tempdir, p4api)
            with open(filename, 'wb') as f:
                self.ftp.retrbinary('RETR ' + p4api, f.write)

            
            tar = tarfile.open(filename, 'r')
            apidir = os.path.join(tempdir, tar.getnames()[0])
                
            # if apidir exists, don't unpack again, otherwise read-only errors will occur
            if not ( os.path.exists(apidir) and os.path.isdir(apidir) ):
                tar.extractall(tempdir)
        except error_perm as e:
            return None
        finally:
            self.ftp.cwd(pwd)

            if tar:
                tar.close()
            
        return apidir

    def findAPI(self, names):
        """
        Searches through the provided list of directories depth first.
        :param names:
        :return: The path to the API dir or None
        :return: The path to the API dir or None
        """

        # start with the first one
        #   drill down in the directory
        #   find the correct platform
        #   descend into the platform directory
        #   see if we can find p4api.tgz
        #   otherwise, use next dated directory and start over

        for d in names:
            apidir = self.descend(d)
            if apidir:
                return apidir

        return None

    def loadAPI(self):
        self.ftp.connect()
        self.ftp.login()
        self.ftp.cwd("perforce")

        dirs = []
        self.ftp.retrlines("LIST", lambda str : dirs.append(str))

        s = self.sortedDirectories(dirs)
        return self.findAPI(s)

class VersionInfo:
  def __init__(self, p4ApiDir):
    self.release_year = None
    self.release_version = None
    self.release_special = None
    self.patchlevel = None
    self.suppdate_year = None
    self.suppdate_month = None
    self.suppdate_day = None

    releasePattern = re.compile("RELEASE\s+=\s+(?P<year>\d+)\s+(?P<version>\d+)\s*(?P<special>.*?)\s*;")
    patchlevelPattern = re.compile("PATCHLEVEL\s+=\s+(?P<level>\d+)")
    suppdatePattern = re.compile("SUPPDATE\s+=\s+(?P<year>\d+)\s+(?P<month>\d+)\s+(?P<day>\d+)")

    self.patterns=[]
    self.patterns.append((releasePattern, self.handleRelease))
    self.patterns.append((patchlevelPattern, self.handlePatchlevel))
    self.patterns.append((suppdatePattern, self.handleSuppDate))

    verFile = os.path.join(p4ApiDir, "sample", "Version")
    if not os.path.exists(verFile):
        verFile = os.path.join(p4ApiDir, "Version")
    input = open(verFile)
    for line in input:
      for pattern, handler in self.patterns:
        m = pattern.match(line)
        if m:
          handler(**m.groupdict())
    input.close()

  def handleRelease(self, year=0, version=0, special=''):
    self.release_year = year
    self.release_version = version
    self.release_special = re.sub("\s+", ".", special)

  def handlePatchlevel(self, level=0):
    self.patchlevel = level

  def handleSuppDate(self, year=0, month=0, day=0):
    self.suppdate_year = year
    self.suppdate_month = month
    self.suppdate_day = day

  def getP4Version(self):
    return "%s.%s" % (self.release_year, self.release_version)

  def getFullP4Version(self):
    version = "%s.%s" % (self.release_year, self.release_version)
    if self.release_special:
      version += ".%s" % self.release_special
    return version

  def getDistVersion(self):
    version = "%s.%s.%s" % (self.release_year, self.release_version, self.patchlevel)
#    if self.release_special:
#        if 'TEST' in self.release_special:
#            version += ".preview"
#    	version += ".%s" % self.release_special
    return version

  def getPatchVersion(self):
    version = "%s.%s" % (self.release_year, self.release_version)
    if self.release_special:
      version += ".%s" % self.release_special
    version += "/%s" % self.patchlevel
    return version

doclines = __doc__.split("\n")

NAME = "p4python"
VERSION = "2015.1"
PY_MODULES = ["P4"]
P4_API_DIR = "p4api"
DESCRIPTION=doclines[0]
AUTHOR="Perforce Software Inc"
MAINTAINER="Perforce Software Inc"
AUTHOR_EMAIL="sknop@perforce.com"
MAINTAINER_EMAIL="support@perforce.com"
LICENSE="LICENSE.txt"
URL="http://www.perforce.com"
KEYWORDS="Perforce perforce P4Python"

P4_CONFIG_FILE="setup.cfg"
P4_CONFIG_SECTION="p4python_config"
P4_CONFIG_P4APIDIR="p4_api"
P4_CONFIG_SSLDIR="p4_ssl"

P4_DOC_RELNOTES="../p4-doc/user/p4pythonnotes.txt"
P4_RELNOTES="RELNOTES.txt"

def copyReleaseNotes():
    """Copies the relnotes from the doc directory to the local directory if they exist
    Returns True if the release notes were copied, otherwise False
    """
    if os.path.exists(P4_DOC_RELNOTES):
      try:
        shutil.copy(P4_DOC_RELNOTES, P4_RELNOTES)
        return True
      except Exception as e:
        print (e)
        return False
    else:
        return False

def deleteReleaseNotes():
    """Removes RELNOTES.txt from the current directory again"""
    os.chmod(P4_RELNOTES, stat.S_IWRITE)
    os.remove(P4_RELNOTES)

class PlatformInfo:
  def __init__(self, apiVersion, releaseVersion, ssl):
    self.libraries=None
    self.extra_compile_args=None
    self.define_macros=None
    self.extra_link_args=None

    unameOut = platform.uname()

    if os.name == "nt":
      if platform.python_compiler().find("64 bit") > 0:
         pl = "NTX64"
         arch = "64"
      else:
         pl = "NTX86"
         arch = "32"
      
      self.ID_OS=self.inStrStr(pl)
      self.ID_REL=self.inStrStr(releaseVersion.getFullP4Version())
      self.ID_PATCH=self.inStrStr(releaseVersion.patchlevel)
      self.ID_API=self.inStrStr(apiVersion.getPatchVersion())
      self.ID_Y=self.inStrStr(releaseVersion.suppdate_year)
      self.ID_M=self.inStrStr(releaseVersion.suppdate_month)
      self.ID_D=self.inStrStr(releaseVersion.suppdate_day)
      self.libraries=["oldnames", "wsock32", "advapi32", "ws2_32", "User32", "Gdi32", # MSVC libs
                      "libclient", "librpc", "libsupp"]    # P4API libs
      if ssl:
        self.libraries.append("libeay%s" % arch)
        self.libraries.append("ssleay%s" % arch)
      else:
        self.libraries.append("libp4sslstub")
      
      self.extra_compile_args=["/DOS_NT", "/DMT", "/DCASE_INSENSITIVE", "/EHsc"]
      self.extra_link_args=["/NODEFAULTLIB:libcmt"]
    elif os.name == "posix":
      self.libraries=["client", "rpc", "supp"]    # P4API libs
      self.extra_link_args = []
      if ssl:
        if unameOut[0] == "Darwin":
            self.extra_link_args = [ os.path.join(ssl, "libssl.a"), os.path.join(ssl,"libcrypto.a") ]
        else:
            self.libraries.append("ssl")
            self.libraries.append("crypto")
      else:
        self.libraries.append("p4sslstub")
      self.extra_compile_args = []

      # it is UNIX, but which one? Let's ask uname()
      # details later

      if unameOut[0] == "Linux":
        unix = "LINUX"
        release = unameOut[2][0:1] + unameOut[2][2:3]
        arch = self.architecture(unameOut[4])
        self.libraries.append("rt")  # for clock_gettime
      elif unameOut[0] == "Darwin":
        unix = "DARWIN"

        self.extra_compile_args.append("-fvisibility-inlines-hidden")
        self.extra_compile_args.append("-DCASE_INSENSITIVE")

        if unameOut[2][0] == "8":
            release = "104"
        elif unameOut[2][0] == "9" :
            release = "105"
            self.extra_link_args += ["-framework", "Carbon"]
        elif unameOut[2][0:2] in ("10", "11") :
            release = "106"
            self.extra_link_args += ["-framework", "Carbon"]
        else:
            release = "100"
            self.extra_link_args += ["-framework", "Carbon"]

        arch = self.architecture(unameOut[4])

        # The following is another hack
        # There is no way to remove the standard compile flags. The default on a MAC
        # is to build a universal binary. The Perforce API is only built for one
        # platform, so we need to remove these flags. By setting the environment
        # variable ARCHFLAGS the defaults can be overriden.

        if arch == "PPC":
            os.environ["ARCHFLAGS"] = "-arch ppc"
        elif arch == "i386":
            os.environ["ARCHFLAGS"] = "-arch i386"
        elif arch == "X86_64":
            os.environ["ARCHFLAGS"] = "-arch x86_64"

      elif unameOut[0] == "SunOS":
        unix = "SOLARIS"
        release = re.match("5.(\d+)", unameOut[2]).group(1)
        arch = self.architecture(unameOut[4])
      elif unameOut[0] == 'FreeBSD':
        unix = "FREEBSD"
        release = unameOut[2][0]
        if release == '5':
            release += unameOut[2][2]

        arch = self.architecture(unameOut[4])
      elif unameOut[0] == 'CYGWIN_NT-5.1':
        unix = "CYGWIN"
        release = ""
        arch = self.architecture(unameOut[4])

      self.ID_OS = self.inStr(unix + release + arch)
      self.ID_REL=self.inStr(releaseVersion.getFullP4Version())
      self.ID_PATCH=self.inStr(releaseVersion.patchlevel)
      self.ID_API=self.inStr(apiVersion.getPatchVersion())
      self.ID_Y=self.inStr(releaseVersion.suppdate_year)
      self.ID_M=self.inStr(releaseVersion.suppdate_month)
      self.ID_D=self.inStr(releaseVersion.suppdate_day)

      self.extra_compile_args.append("-DOS_" + unix)
      self.extra_compile_args.append("-DOS_" + unix + release)
      self.extra_compile_args.append("-DOS_" + unix + arch)
      self.extra_compile_args.append("-DOS_" + unix + release + arch)

    self.define_macros = [('ID_OS', self.ID_OS),
                          ('ID_REL', self.ID_REL),
                          ('ID_PATCH', self.ID_PATCH),
                          ('ID_API', self.ID_API),
                          ('ID_Y', self.ID_Y),
                          ('ID_M', self.ID_M),
                          ('ID_D', self.ID_D)]

  def inStr(self, str):
    return '"' + str + '"'

  def inStrStr(self, str):
    return '"\\"' + str + '\\""'

  def architecture(self, str):
    if str == 'x86_64':
      return "X86_64"
    elif re.match('i.86', str):
      return "X86"
    elif str == 'i86pc':
      return "X86"
    elif str == 'Power Macintosh':
      return 'PPC'
    elif str == 'powerpc':
      return 'PPC'
    elif str == 'amd64':
      return 'X86_64'
    elif str == 'sparc':
      return 'SPARC'
    elif re.match('arm.*', str):
      return "ARM"

def do_setup(p4_api_dir, ssl):
    global global_dist_directory

    try:
      apiVersion = VersionInfo(p4_api_dir)
      releaseVersion = VersionInfo(".")
    except IOError:
      print ("Cannot find Version file in API dir or distribution dir.")
      print ("API path = ", p4_api_dir)
      exit(1)

    ryear = int(apiVersion.release_year)
    rversion = int(apiVersion.release_version)
    global_dist_directory += releaseVersion.getDistVersion()

    if (ryear < 2012) or (ryear == 2012 and rversion < 2):
      print ("API Release %s.%s not supported. Minimum requirement is 2012.2." % (ryear, rversion))
      print ("Please download a more recent API release from the Perforce ftp site.")
      exit(1)
    else:
      print ("API Release %s.%s" % (ryear, rversion))

    inc_path = [p4_api_dir, os.path.join(p4_api_dir, "include", "p4")]
    lib_path = [p4_api_dir, os.path.join(p4_api_dir, "lib")]
    if ssl:
        lib_path.append( ssl )

    info = PlatformInfo(apiVersion, releaseVersion, ssl)

    setup(name=NAME,
          version=releaseVersion.getDistVersion(),
          description=DESCRIPTION,
          author=AUTHOR,
          author_email=AUTHOR_EMAIL,
          maintainer=MAINTAINER,
          maintainer_email=MAINTAINER_EMAIL,
          license=LICENSE,
          url=URL,
          keywords=KEYWORDS,
          classifiers = [ x for x in classifiers.split("\n") if x ],
          long_description = "\n".join(doclines[2:]),
          py_modules=PY_MODULES,
          ext_modules=[Extension("P4API", ["P4API.cpp", "PythonClientAPI.cpp",
                                            "PythonClientUser.cpp", "SpecMgr.cpp",
                                            "P4Result.cpp",
                                            "PythonMergeData.cpp", "P4MapMaker.cpp",
                                            "PythonSpecData.cpp", "PythonMessage.cpp",
                                            "PythonActionMergeData.cpp", "PythonClientProgress.cpp",
                                            "P4PythonDebug.cpp"],
                         include_dirs = inc_path,
                         library_dirs = lib_path,
                         libraries = info.libraries,
                         extra_compile_args = info.extra_compile_args,
                         define_macros = info.define_macros,
                         extra_link_args = info.extra_link_args
                        )])

def get_api_dir():
    if '--apidir' in sys.argv:
        index = sys.argv.index("--apidir")
        if index < len(sys.argv) - 1:
            p4_api_dir = sys.argv[index + 1]
            del sys.argv[index:index+2]
        else:
            print ("Error: --apidir needs API dir as an argument")
            sys.exit(99)
    else:
        config = ConfigParser()
        config.read(P4_CONFIG_FILE)
        p4_api_dir = None
        if config.has_section(P4_CONFIG_SECTION):
            if config.has_option(P4_CONFIG_SECTION, P4_CONFIG_P4APIDIR):
                p4_api_dir = config.get(P4_CONFIG_SECTION, P4_CONFIG_P4APIDIR)
        if not p4_api_dir:
            # try to download the API from the ftp site
            print( "Attempting to load API from ftp.perforce.com" )
            p4ftp = P4APIFtp()
            p4_api_dir = p4ftp.loadAPI()
            print( "Loaded API into {0}".format(p4_api_dir) )

    return p4_api_dir

def force_remove_file(function, path, excinfo):
    os.chmod( path, stat.S_IWRITE )
    os.unlink( path )

def rreplace(s, old, new, occurrence=1):
    li = s.rsplit(old, occurrence)
    return new.join(li)


def check_ssl():
    try:
        (version_string,err) = subprocess.Popen(["openssl","version"], stdout=subprocess.PIPE,stderr=subprocess.PIPE).communicate()
    except IOError:
        print("****************************************************",file=sys.stderr)
        print("No openssl in path and no ssl library path specified", file=sys.stderr)
        print("Building without SSL",file=sys.stderr)
        print("****************************************************",file=sys.stderr)
        return None
    
    if err:
        print("****************************************************",file=sys.stderr)
        print("Cannot determine the version of openssl", file=sys.stderr)
        print("Building without SSL",file=sys.stderr)
        print("****************************************************",file=sys.stderr)

    if type(version_string) == bytes:
        version_string = version_string.decode('utf8')
    
    pattern = re.compile("OpenSSL (\d)\.(\d)\.(\d)(\w+)\s+\d+ \S+ \d+")
    match = pattern.match(version_string)
    if match:
        version = int(match.group(1)) * 100 + int(match.group(2)) * 10 + int(match.group(3)) * 1
        if version >= MIN_SSL_VERSION:
            release = match.group(4)
            for p in os.environ["PATH"].split(os.pathsep):
                pathToFile = os.path.join(p, "openssl")
                if os.path.exists(pathToFile) and os.access(pathToFile, os.X_OK):
                    libpath = rreplace(p,"bin","lib")
                    if os.path.exists(libpath) and os.path.isdir(libpath):
                        return libpath
                    else:
                        print("****************************************************",file=sys.stderr)
                        print("Calculated path {} for SSL does not exist".format(libpath), file=sys.stderr)
                        print("Building without SSL",file=sys.stderr)
                        print("****************************************************",file=sys.stderr)
                        return None
        else:
            print("***************************************",file=sys.stderr)
            print("Minimum SSL release required is 1.0.0",file=sys.stderr)
            print("Building without SSL",file=sys.stderr)
            print("***************************************",file=sys.stderr)

    return None

if __name__ == "__main__":

    if 'sdist' in sys.argv:
        # Don't use hard links when building source distribution.
        # It's great, apart from under VirtualBox where it falls
        # apart due to a bug
        try:
            del os.link
        except:
            pass

        if os.path.exists(P4_RELNOTES):
            deleteReleaseNotes()
        copyReleaseNotes()

        distdir = global_dist_directory + VersionInfo(".").getDistVersion()
        if os.path.exists(distdir):
            shutil.rmtree(distdir, False, force_remove_file)

    p4_api_dir = get_api_dir()

    ssl = None
    if '--ssl' in sys.argv:
        index = sys.argv.index("--ssl")
        if index < len(sys.argv) - 1:
            ssl = sys.argv[index + 1]
            del sys.argv[index:index+2]
        else:
            ssl = ""
            del sys.argv[index:index+1]
    else:
        config = ConfigParser()
        config.read(P4_CONFIG_FILE)

        if config.has_section(P4_CONFIG_SECTION):
            if config.has_option(P4_CONFIG_SECTION, P4_CONFIG_SSLDIR):
                ssl = config.get(P4_CONFIG_SECTION, P4_CONFIG_SSLDIR)

    if ssl == None:
        print("*******************************************", file=sys.stderr)
        print("** Building P4Python without SSL support **", file=sys.stderr)
        print("*******************************************", file=sys.stderr)
        
    if ssl == "":
        # check version of SSL via 'openssl version'
        ssl = check_ssl() # return None if illegal or too old
    
    do_setup(p4_api_dir, ssl)
