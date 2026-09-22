import { readFile } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';
import { defineConfig } from 'vite';

import { getInputFiles, packageOutputPlugin } from './helpers.ts';

const outDir = './package/dist';
const styles = resolve(import.meta.dirname, '../package/src/styles');
const input = getInputFiles(styles);
const stylesheetPath = (file: string) => `styles/${relative(styles, resolve(file)).split(sep).join('/')}`;

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
        assetFileNames: (assetInfo) => {
          const original = assetInfo.originalFileNames[0];
          if (!original) throw new Error(`Missing stylesheet source for ${assetInfo.names.join(', ')}`);
          return stylesheetPath(original);
        },
      },
      input,
    },
  },
  plugins: [
    {
      name: 'calendar-package-docs',
      async buildStart() {
        for (const fileName of ['README.md', 'LICENSE']) {
          const source = resolve(import.meta.dirname, '..', fileName);
          this.addWatchFile(source);
          this.emitFile({ type: 'asset', fileName, source: await readFile(source) });
        }
      },
    },
    {
      name: 'calendar-style-paths',
      generateBundle(_, bundle) {
        // Vite deduplicates identical CSS assets, including empty theme parts. Every documented
        // import must still resolve to a standalone file at its own path.
        const files = new Set(Object.keys(bundle));
        for (const asset of Object.values(bundle)) {
          if (asset.type !== 'asset' || !asset.fileName.endsWith('.css')) continue;
          for (const original of asset.originalFileNames) {
            const fileName = stylesheetPath(original);
            if (!files.has(fileName)) {
              this.emitFile({ type: 'asset', fileName, source: asset.source });
              files.add(fileName);
            }
          }
        }
        for (const file of input) if (!files.has(stylesheetPath(file))) throw new Error(`Missing stylesheet: ${file}`);
      },
    },
    packageOutputPlugin(),
  ],
});
