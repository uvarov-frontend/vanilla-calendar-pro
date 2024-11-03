import { resolve } from 'path';
import { defineConfig } from 'vite';

import { bannerPlugin } from './helpers';

const outDir = './package/dist';

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
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && ['index.css', 'layout.css'].includes(assetInfo.name)) {
            return 'styles/[name].[ext]';
          }
          return 'styles/themes/[name].[ext]';
        },
      },
      input: {
        main: resolve(__dirname, '../package/src/styles/index.css'),
        layout: resolve(__dirname, '../package/src/styles/layout.css'),
        light: resolve(__dirname, '../package/src/styles/themes/light.css'),
        dark: resolve(__dirname, '../package/src/styles/themes/dark.css'),
        'slate-light': resolve(__dirname, '../package/src/styles/themes/slate-light.css'),
      },
    },
  },
  plugins: [bannerPlugin(outDir)],
});
