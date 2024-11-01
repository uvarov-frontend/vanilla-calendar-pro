import { resolve } from 'path';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';

import { version } from '../package/package.json';

const outDir = './package/build/scripts';

export default defineConfig({
  build: {
    target: 'ES6',
    assetsDir: '',
    outDir,
    minify: false,
    lib: {
      name: 'VanillaCalendar',
      fileName(format, entryName) {
        return `${entryName}${format === 'es' ? '.mjs' : '.js'}`;
      },
      entry: resolve(__dirname, '../package/src/vanilla-calendar.ts'),
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
    dts({ tsconfigPath: './tsconfig.build.json', outDir: './package/build/types' }),
  ],
});
