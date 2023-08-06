
from __future__ import print_function, absolute_import

import os

from .mixins.util import UtilMixIn
from .mixins.path import PathMixIn
from .mixins.package import PackageMixIn

class SubTool( PathMixIn, PackageMixIn, UtilMixIn, object ):
    TYPE_RUNENV = 'runenv'
    TYPE_RUNTIME = 'runtime'
    TYPE_BUILD = 'build'
    TYPE_VCS = 'vcs'
    TYPE_RMS = 'rms'
    _dev_null = None
    
    def __init__( self, name ) :
        self._name = name
        self._have_tool = False
        
    def getType( self ):
        raise NotImplementedError( self._name )

    def getDeps( self ) :
        return []
    
    def _installTool( self, env ):
        raise NotImplementedError( "Tool (%s) must be manually installed"  % self._name )
    
    def _envNames( self ) :
        return [ self._name + 'Bin' ]
    
    def importEnv( self, env ):
        environ = os.environ

        for name in self._envNames():
            val = environ.get(name, None)
            if val is not None:
                env[name] = val
                
    def exportEnv( self, env, dst):
        for name in self._envNames():
            if name in env:
                dst[name] = env[name]
    
    def initEnv( self, env ) :
        name = self._name
        bin_env = name + 'Bin'

        if bin_env not in env :
            tool_path = self._which( name )
            if tool_path :
                env[ bin_env ] = tool_path.strip()
                self._have_tool = True
    
    def autoDetect( self, config ) :
        return False
    
    def requireInstalled( self, env ) :
        self.importEnv( env )
        self.initEnv( env )

        if not self._have_tool:
            if self.isExternalToolsSetup( env ):
                raise RuntimeError( "Tool (%s) must be installed externally (env config)"  % self._name )
            else :
                self._installTool( env )

            self.initEnv( env )
            
            if not self._have_tool:
                raise RuntimeError( "Failed to install " + self._name )

    def isInstalled( self, env ):
        self.initEnv( env )
        return self._have_tool

    def updateTool( self, env ):
        self.requireInstalled( env )
        
    def uninstallTool( self, env ):
        self._have_tool = False
        raise RuntimeError( "Tool (%s) must be uninstalled externally"  % self._name )

    def loadConfig( self, config ) :
        pass
    
    def updateProjectConfig( self, config, updates ) :
        """
updates = {
    name : '...',
    version : '...',
}
@return a list of files to be committed
"""
        return []
   
    def onPrepare( self, config ):
        pass
    
    def onBuild( self, config ):
        pass
    
    def onPackage( self, config ):
        pass

    def onMigrate( self, config, location ):
        pass
    

