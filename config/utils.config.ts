import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { alias, bannerPlugin } from './helpers.ts';

const outDir = './package/dist/utils';

export default defineConfig({
  build: {
    target: 'es2015',
    assetsDir: '',
    outDir,
    minify: false,
    emptyOutDir: false,
    lib: {
      name: 'VanillaCalendarProUtils',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      entry: resolve(import.meta.dirname, '../package/src/utils/index.ts'),
    },
  },
  resolve: { alias },
  plugins: [bannerPlugin(), dts({ tsconfigPath: './tsconfig.utils.json', outDirs: './package/dist' })],
});
