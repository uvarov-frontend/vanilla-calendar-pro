import { resolve } from 'path';
import { defineConfig } from 'vite';

import { bannerPlugin, getInputFiles } from './helpers';

const outDir = './package/dist';
const input = getInputFiles(resolve(__dirname, '../package/src/styles'));

export default defineConfig({
  publicDir: './package/public',
  build: {
    target: 'ES6',
    assetsDir: '',
    outDir,
    cssCodeSplit: true,
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        assetFileNames: (assetInfo) =>
          assetInfo.name && ['index.css', 'layout.css'].includes(assetInfo.name) ? 'styles/[name].[ext]' : 'styles/themes/[name].[ext]',
      },
      input,
    },
  },
  plugins: [bannerPlugin(outDir)],
});
