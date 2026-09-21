import { resolve } from 'node:path';
import { defineConfig } from 'vite';

import { alias, libraryBuild, packageOutputPlugin } from './helpers.ts';

const outDir = './package/dist/utils';

export default defineConfig({
  build: {
    ...libraryBuild,
    outDir,
    lib: {
      name: 'VanillaCalendarProUtils',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      entry: resolve(import.meta.dirname, '../package/src/utils/index.ts'),
    },
  },
  resolve: { alias },
  plugins: [packageOutputPlugin()],
});
