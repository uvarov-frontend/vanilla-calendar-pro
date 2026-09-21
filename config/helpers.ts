import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

import metadata from '../package/public/package.json' with { type: 'json' };

const { version } = metadata;

export const bannerPlugin = (): Plugin => ({
  name: 'calendar-banner',
  generateBundle(_options, bundle) {
    const banner = `/*! name: vanilla-calendar-pro v${version} | url: https://github.com/uvarov-frontend/vanilla-calendar-pro */\n`;
    for (const output of Object.values(bundle)) {
      if (output.type === 'chunk') output.code = banner + output.code;
      else if (output.fileName.endsWith('.css')) output.source = banner + output.source;
    }
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
