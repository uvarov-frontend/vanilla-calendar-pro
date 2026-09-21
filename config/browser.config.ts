import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { alias, libraryBuild, packageOutputPlugin } from './helpers.ts';

export default defineConfig({
  build: {
    ...libraryBuild,
    outDir: './package/dist',
    lib: {
      name: 'VanillaCalendarPro',
      formats: ['umd'],
      fileName: () => 'index.js',
      entry: resolve(import.meta.dirname, '../package/src/browser.ts'),
    },
  },
  resolve: { alias },
  plugins: [packageOutputPlugin()],
});
