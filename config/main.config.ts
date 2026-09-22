import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { alias, libraryBuild, packageOutputPlugin } from './helpers.ts';

const outDir = './package/dist';

export default defineConfig({
  build: {
    ...libraryBuild,
    outDir,
    lib: {
      name: 'VanillaCalendarPro',
      formats: ['es'],
      fileName: () => 'index.mjs',
      entry: resolve(import.meta.dirname, '../package/src/index.ts'),
    },
  },
  resolve: { alias },
  plugins: [packageOutputPlugin(), dts({ tsconfigPath: './tsconfig.main.json', outDirs: outDir })],
});
