import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      base: '/',
      build: {
        rollupOptions: {
          output: {
            /**
             * Split the libraries out of the entry chunk.
             *
             * This does not shrink the total download, but it changes what a
             * repeat visitor pays. Everything used to live in one hashed file,
             * so editing a single line of site copy invalidated React and
             * framer-motion along with it and every returning visitor
             * re-downloaded ~150 kB of unchanged library code. Split, a content
             * change busts only the app chunk, and the three vendor files stay
             * in cache across deploys. The browser also fetches them in
             * parallel rather than as one serial blob.
             */
            manualChunks: {
              react: ['react', 'react-dom', 'react-router-dom'],
              motion: ['framer-motion'],
              head: ['react-helmet-async'],
            },
          },
        },
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
