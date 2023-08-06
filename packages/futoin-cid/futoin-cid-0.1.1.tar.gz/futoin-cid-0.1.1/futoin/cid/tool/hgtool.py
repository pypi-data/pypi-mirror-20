
import os

from ..vcstool import VcsTool

class hgTool( VcsTool ):
    def getDeps( self ) :
        return [ 'bash' ]
    
    def _installTool( self, env ):
        self.requirePackages(['mercurial'])
    
    def autoDetect( self, config ) :
        return self._autoDetectVCS( config, '.hg' )

    def vcsCheckout( self, config, vcs_ref ):
        hgBin = config['env']['hgBin']
        wc_dir = config['wcDir']

        if os.path.isdir( wc_dir + '/.hg' ):
            os.chdir( wc_dir )

        if os.path.isdir( '.hg' ):
            if 'vcsRepo' in config:
                remote_info = self._callExternal( [ hgBin, 'paths', 'default' ] ) or ''
                if remote_info.find( config['vcsRepo'] ) < 0 :
                    raise RuntimeError( "Hg remote mismatch: " + remote_info )

            self._callExternal( [ hgBin, 'pull' ] )
        elif os.path.exists( wc_dir ):
            raise RuntimeError( "Path already exists: " + wc_dir )
        else :
            self._callExternal( [ hgBin, 'clone', config['vcsRepo'], wc_dir ] )
            os.chdir( wc_dir )

        self._callExternal( [ hgBin, 'checkout', '--check', vcs_ref ] )
    
    def vcsCommit( self, config, message, files ):
        hgBin = config['env']['hgBin']
        self._callExternal( [ hgBin, 'commit', '-m', message ] + files )
    
    def vcsTag( self, config, tag, message ):
        hgBin = config['env']['hgBin']
        self._callExternal( [ hgBin, 'tag', '-m', message, tag ] )
    
    def vcsPush( self, config, refs ):
        env = config['env']
        hgBin = env['hgBin']
        bash_bin = env['bashBin']
        opts = []
        for r in refs :
            is_tag = self._callExternal( [
                bash_bin, '--noprofile', '--norc', '-c',
                '%s tags | egrep "^%s" || true' % ( hgBin, r )
            ] )
            
            if is_tag : continue
                
            opts.append( '-b' )
            opts.append( r )
        self._callExternal( [ hgBin, 'push' ] + opts )
        
    def vcsGetRevision( self, config ) :
        hgBin = config['env']['hgBin']
        return self._callExternal( [ hgBin, 'identify', '--id' ] ).strip()
        
