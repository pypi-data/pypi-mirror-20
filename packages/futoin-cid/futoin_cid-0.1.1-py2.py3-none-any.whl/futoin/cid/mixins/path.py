
from __future__ import print_function, absolute_import

import os, sys, subprocess

class PathMixIn( object ):
    @classmethod
    def _callExternal( cls, cmd, suppress_fail=False, verbose=True ) :
        try:
            if verbose and not suppress_fail:
                print( 'Call: ' + subprocess.list2cmdline( cmd ), file=sys.stderr )
                stderr = sys.stderr
            else:
                if not cls._dev_null:
                    cls._dev_null = open(os.devnull, 'w')
                stderr = cls._dev_null
            res = subprocess.check_output( cmd, stdin=subprocess.PIPE, stderr=stderr )
            
            try:
                res = str(res, 'utf8')
            except:
                pass
            
            return res
        except subprocess.CalledProcessError as e:
            if suppress_fail :
                return None
            raise e
    
    @classmethod
    def _which( cls, program ):
        "Copied from stackoverflow"
        def is_exe(fpath):
            return os.path.isfile(fpath) and os.access(fpath, os.X_OK)

        fpath, fname = os.path.split(program)
        if fpath:
            if is_exe(program):
                return program
        else:
            for path in os.environ["PATH"].split(os.pathsep):
                path = path.strip('"')
                exe_file = os.path.join(path, program)
                if is_exe(exe_file):
                    return exe_file

        return None

    @classmethod
    def addBinPath( cls, bin_dir, first=False ) :
        bin_dir_list = os.environ['PATH'].split(os.pathsep)

        if bin_dir not in bin_dir_list:
            if first :
                bin_dir_list[0:0] = bin_dir
            else :
                bin_dir_list.append(bin_dir)

            os.environ['PATH'] = os.pathsep.join(bin_dir_list)