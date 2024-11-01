import { resolve } from 'path';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';

import { version } from '../package/package.json';

const outDir = './package/build/scripts';

export default defineConfig({
  build: {
    target: 'ES6',
    assetsDir: '',
    outDir,
    minify: false,
    emptyOutDir: false,
    lib: {
      name: 'VanillaCalendarPro',
      fileName() {
        return `vanilla-calendar-pro.js`;
      },
      entry: resolve(__dirname, '../package/src/index.cjs.ts'),
      formats: ['iife'],
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
  ],
});
