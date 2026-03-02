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
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
          passes: 3,
          arrows: true,
          arguments: true,
          booleans: true,
          dead_code: true,
          evaluate: true,
          join_vars: true,
          loops: true,
          reduce_vars: true,
          unused: true,
          collapse_vars: true,
          inline: 2,
          side_effects: true
        },
        mangle: {
          safari10: true,
          toplevel: true
        },
        format: {
          comments: false,
          ecma: 2020
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Core React libs - keep together
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'react-vendor';
              }
              if (id.includes('react-router')) {
                return 'router';
              }
              if (id.includes('@supabase')) {
                return 'supabase';
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

            // Split pages individually
            if (id.includes('src/pages/')) {
              const match = id.match(/pages\/(\w+)Page/);
              if (match) return `page-${match[1].toLowerCase()}`;
              return 'pages';
            }

            // Component groups
            if (id.includes('src/components/Forum/')) return 'comp-forum';
            if (id.includes('src/components/Chat/')) return 'comp-chat';
            if (id.includes('src/components/Reviews/')) return 'comp-reviews';
            if (id.includes('src/components/Admin/')) return 'comp-admin';
            if (id.includes('src/components/Auth/')) return 'comp-auth';

            // Services and contexts
            if (id.includes('src/services/')) return 'services';
            if (id.includes('src/contexts/')) return 'contexts';
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
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          experimentalMinChunkSize: 10000,
          compact: true
        },
        treeshake: {
          moduleSideEffects: 'no-external',
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false
        }
      },
      chunkSizeWarningLimit: 500,
      reportCompressedSize: false,
      sourcemap: false,
      cssMinify: true
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        'date-fns/formatDistanceToNow',
        'date-fns/format',
        'lucide-react',
        'clsx',
        'tailwind-merge'
      ],
      exclude: ['emoji-picker-react'],
      esbuildOptions: {
        target: 'es2020'
      }
    },
    server: {
      hmr: {
        overlay: false
      }
    }
  };
});
