
from ..runtimetool import RuntimeTool

class rubyTool( RuntimeTool ):
    RUBY_SYSTEM_VER = 'system'
    
    def getDeps( self ) :
        return [ 'rvm' ]

    def _installTool( self, env ):
        ruby_ver = env['rubyVer']
        
        if ruby_ver == self.RUBY_SYSTEM_VER:
            self._systemDeps()
            return
        
        self._buildDeps()
        self._callExternal([
            env['rvmBin'], 'install', ruby_ver, '--autolibs=read-only'
        ])
        self._callExternal([
            env['rvmBin'], 'cleanup', 'all'
        ])

    def updateTool( self, env ):
        if env['rubyVer'] != self.RUBY_SYSTEM_VER:
            self._installTool( env )
        
    def uninstallTool( self, env ):
        ruby_ver = env['rubyVer']
        
        if ruby_ver != self.RUBY_SYSTEM_VER:
            self._callExternal([
                env['rvmBin'], 'uninstall', env['rubyVer']
            ])
            self._have_tool = False

    def _envNames( self ) :
        return ['rubyVer', 'rubyBin' ]

    def initEnv( self, env ) :
        ruby_ver = env.setdefault('rubyVer', self.RUBY_SYSTEM_VER)

        rvm_dir = env['rvmDir']
        bash_bin = env['bashBin']

        try:
            env_to_set = self._callExternal(
                [ bash_bin,  '--noprofile', '--norc', '-c',
                'source {0}/scripts/rvm && \
                rvm use {1} >/dev/null && \
                env | grep "rvm"'.format(rvm_dir, ruby_ver) ],
                verbose = False
            )
        except:
            return

        if env_to_set :
            self._updateEnvFromOutput(env_to_set)
            super(rubyTool, self).initEnv( env )
            
    def _buildDeps( self ):
        self.requireDeb([
            'build-essential',
            'gawk',
            'libssl-dev',
            'make',
            'libc6-dev',
            'zlib1g-dev',
            'libyaml-dev',
            'libsqlite3-dev',
            'sqlite3',
            'autoconf',
            'libgmp-dev',
            'libgdbm-dev',
            'libncurses5-dev',
            'automake',
            'libtool',
            'bison',
            'pkg-config',
            'libffi-dev',
            'libgmp-dev',
            'libreadline-dev',
        ])
        
        self.requireRpm([
            'binutils',
            'patch',
            'libyaml-devel',
            'autoconf',
            'gcc',
            'gcc-c++',
            'glibc-devel',
            'readline-devel',
            'zlib-devel',
            'libffi-devel',
            'openssl-devel',
            'automake',
            'libtool',
            'bison',
            'sqlite-devel',
            'make',
            'm4',
            'gdbm-devel',
            'libopenssl-devel',
            'sqlite3-devel',
        ])
        
    def _systemDeps( self ):
        self.requirePackages(['ruby'])
