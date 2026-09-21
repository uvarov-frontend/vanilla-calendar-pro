import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { alias, bannerPlugin } from './helpers.ts';

const outDir = './package/dist';

export default defineConfig({
  build: {
    target: 'es2015',
    assetsDir: '',
    outDir,
    minify: false,
    emptyOutDir: false,
    lib: {
      name: 'VanillaCalendarPro',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      entry: resolve(import.meta.dirname, '../package/src/index.ts'),
    },
  },
  resolve: { alias },
  plugins: [bannerPlugin(), dts({ tsconfigPath: './tsconfig.main.json', outDirs: outDir })],
});
