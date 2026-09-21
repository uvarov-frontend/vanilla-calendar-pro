import { resolve } from 'node:path';
import { defineConfig } from 'vite';

import { getInputFiles, packageOutputPlugin } from './helpers.ts';

const outDir = './package/dist';
const input = getInputFiles(resolve(import.meta.dirname, '../package/src/styles'));

export default defineConfig({
  publicDir: './package/public',
  build: {
    target: 'es2015',
    assetsDir: '',
    outDir,
    cssCodeSplit: true,
    minify: false,
    emptyOutDir: true,
    rolldownOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name && ['index.css', 'layout.css'].includes(assetInfo.name) ? 'styles/[name].[ext]' : 'styles/themes/[name].[ext]',
      },
      input,
    },
  },
  plugins: [packageOutputPlugin()],
});
