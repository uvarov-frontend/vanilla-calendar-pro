import { resolve } from 'path';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import eslint from 'vite-plugin-eslint';

import { version } from '../package/package.json';

const outDir = './package/utilities';

export default defineConfig({
  build: {
    target: 'ES6',
    assetsDir: '',
    outDir,
    minify: false,
    emptyOutDir: false,
    lib: {
      name: 'VanillaCalendarUtilities',
      fileName(format) {
        return `index${format === 'es' ? '.mjs' : '.js'}`;
      },
      entry: resolve(__dirname, '../package/src/utilities.ts'),
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../'),
      '@package': resolve(__dirname, '../package'),
      '@src': resolve(__dirname, '../package/src'),
      '@scripts': resolve(__dirname, '../package/src/scripts'),
    },
  },
  plugins: [
    banner({
      outDir,
      content: `name: vanilla-calendar-pro v${version} | url: https://github.com/uvarov-frontend/vanilla-calendar-pro`,
    }),
    eslint(),
  ],
});
