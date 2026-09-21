import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import cssnano from 'cssnano';
import postcss from 'postcss';
import { minify } from 'terser';
import type { BuildOptions, Plugin } from 'vite';

import metadata from '../package/public/package.json' with { type: 'json' };

const { version } = metadata;

export const libraryBuild: BuildOptions = {
  target: 'es2015',
  assetsDir: '',
  minify: 'oxc',
  emptyOutDir: false,
  rolldownOptions: {
    output: {
      // Oxc compression followed by Terser produces the smallest bundles here.
      // Leave name mangling to Terser so its Safari 10 scope workaround applies.
      minify: { compress: { target: 'es2015' }, mangle: false, codegen: false },
    },
  },
};

export const packageOutputPlugin = (): Plugin => ({
  name: 'calendar-package-output',
  async generateBundle(options, bundle) {
    const banner = `/*! name: vanilla-calendar-pro v${version} | url: https://github.com/uvarov-frontend/vanilla-calendar-pro */\n`;
    await Promise.all(
      Object.values(bundle).map(async (output) => {
        if (output.type === 'chunk') {
          const result = await minify(banner + output.code, {
            ecma: 2015,
            module: options.format === 'es',
            safari10: true,
            compress: { passes: 3 },
            // Consumers must still be able to remove unused ESM code.
            format: { preserve_annotations: options.format === 'es' },
          });
          if (!result.code) throw new Error(`Empty JavaScript output: ${output.fileName}`);
          output.code = result.code;
        } else if (output.fileName.endsWith('.css')) {
          const source = typeof output.source === 'string' ? output.source : Buffer.from(output.source).toString();
          output.source = (await postcss([cssnano]).process(banner + source, { from: output.fileName })).css;
        }
      }),
    );
  },
});

export const alias = {
  '@': resolve(import.meta.dirname, '../'),
  '@package': resolve(import.meta.dirname, '../package'),
  '@src': resolve(import.meta.dirname, '../package/src'),
  '@scripts': resolve(import.meta.dirname, '../package/src/scripts'),
};

export const getInputFiles = (dir: string): string[] => {
  const files: string[] = [];

  const readDir = (path: string): void => {
    readdirSync(path, { withFileTypes: true }).forEach((item) => {
      const itemPath = resolve(path, item.name);
      if (item.isDirectory()) {
        readDir(itemPath);
      } else if (!item.name.startsWith('.')) {
        files.push(itemPath);
      }
    });
  };

  readDir(dir);
  return files;
};
