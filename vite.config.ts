import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''),
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug', 'console.warn'] : [],
          passes: 3,
          arrows: true,
          arguments: true,
          booleans: true,
          booleans_as_integers: true,
          dead_code: true,
          directives: true,
          evaluate: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: false,
          if_return: true,
          join_vars: true,
          keep_fargs: false,
          loops: true,
          negate_iife: true,
          properties: true,
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          toplevel: true,
          typeofs: true,
          unused: true,
          collapse_vars: true,
          inline: 3,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_symbols: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true
        },
        mangle: {
          safari10: true,
          toplevel: true,
          eval: true,
          keep_classnames: false,
          keep_fnames: false,
          properties: {
            regex: /^_/
          }
        },
        format: {
          comments: false,
          ecma: 2020,
          ascii_only: true,
          webkit: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Core React libs - absolute minimum together
              if (id.includes('react/') && !id.includes('react-dom') && !id.includes('react-router')) {
                return 'react-core';
              }
              if (id.includes('react-dom') || id.includes('scheduler')) {
                return 'react-dom';
              }
              if (id.includes('react-router')) {
                return 'router';
              }
              if (id.includes('@supabase/supabase-js')) {
                return 'supabase';
              }
              if (id.includes('@supabase/') && !id.includes('supabase-js')) {
                return 'supabase-utils';
              }
              if (id.includes('framer-motion')) {
                return 'framer';
              }
              if (id.includes('emoji-picker-react')) {
                return 'emoji';
              }
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              if (id.includes('date-fns')) {
                return 'date-fns';
              }
              if (id.includes('react-hot-toast')) {
                return 'toast';
              }
              if (id.includes('clsx') || id.includes('tailwind-merge')) {
                return 'utils';
              }
              return 'vendor';
            }

            // Critical path - keep together
            if (id.includes('src/main.tsx') || id.includes('src/App.tsx')) {
              return 'main';
            }

            // Split pages individually for better lazy loading
            if (id.includes('src/pages/')) {
              const match = id.match(/pages\/(\w+)Page/);
              if (match) return `page-${match[1].toLowerCase()}`;
              return 'pages';
            }

            // Component groups - more granular splitting
            if (id.includes('src/components/Forum/')) return 'comp-forum';
            if (id.includes('src/components/Chat/')) return 'comp-chat';
            if (id.includes('src/components/Reviews/')) return 'comp-reviews';
            if (id.includes('src/components/Admin/')) return 'comp-admin';
            if (id.includes('src/components/Auth/')) return 'comp-auth';
            if (id.includes('src/components/ui/')) return 'comp-ui';

            // Services and contexts - keep separate
            if (id.includes('src/services/')) return 'services';
            if (id.includes('src/contexts/')) return 'contexts';
            if (id.includes('src/hooks/')) return 'hooks';
            if (id.includes('src/utils/')) return 'utils-app';
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/img/[name]-[hash][extname]`;
            } else if (/woff|woff2/.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: (chunkInfo) => {
            // Critical chunks get priority naming
            if (chunkInfo.name.includes('main') || chunkInfo.name.includes('react-core')) {
              return 'assets/js/critical/[name]-[hash].js';
            }
            return 'assets/js/[name]-[hash].js';
          },
          entryFileNames: 'assets/js/[name]-[hash].js',
          experimentalMinChunkSize: 3000,
          compact: true,
          inlineDynamicImports: false,
          generatedCode: {
            arrowFunctions: true,
            constBindings: true,
            objectShorthand: true
          },
          hoistTransitiveImports: true
        },
        treeshake: {
          moduleSideEffects: 'no-external',
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
          annotations: true,
          preset: 'smallest'
        },
        external: [],
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          warn(warning);
        }
      },
      chunkSizeWarningLimit: 300,
      reportCompressedSize: false,
      sourcemap: false,
      assetsInlineLimit: 4096,
      modulePreload: {
        polyfill: false
      }
    },
    optimizeDeps: {
      include: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        'date-fns/formatDistanceToNow',
        'date-fns/format',
        'lucide-react',
        'clsx',
        'tailwind-merge',
        'react-hot-toast'
      ],
      exclude: ['emoji-picker-react', 'framer-motion'],
      esbuildOptions: {
        target: 'es2020',
        treeShaking: true,
        minify: true,
        legalComments: 'none',
        keepNames: false
      },
      force: mode === 'production'
    },
    server: {
      hmr: {
        overlay: false
      }
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      treeShaking: true,
      legalComments: 'none',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    worker: {
      format: 'es',
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  };
});
