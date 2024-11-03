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
          if (assetInfo.name && ['light.css', 'dark.css', 'slate-light.css'].includes(assetInfo.name)) {
            return 'styles/themes/[name].[ext]';
          }
          return 'styles/[name].[ext]';
        },
      },
      input: {
        main: resolve(__dirname, '../package/src/styles/vanilla-calendar-pro.css'),
        layout: resolve(__dirname, '../package/src/styles/vanilla-calendar-pro.layout.css'),
        light: resolve(__dirname, '../package/src/styles/themes/light.css'),
        dark: resolve(__dirname, '../package/src/styles/themes/dark.css'),
        'slate-light': resolve(__dirname, '../package/src/styles/themes/slate-light.css'),
      },
    },
  },
  plugins: [bannerPlugin(outDir)],
});
