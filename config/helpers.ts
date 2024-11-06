import { readdirSync } from 'fs';
import { resolve } from 'path';
import banner from 'vite-plugin-banner';

import { version } from '../package/public/package.json';

export const bannerPlugin = (outDir: string) =>
  banner({ outDir, content: `name: vanilla-calendar-pro v${version} | url: https://github.com/uvarov-frontend/vanilla-calendar-pro` });

export const alias = {
  '@': resolve(__dirname, '../'),
  '@package': resolve(__dirname, '../package'),
  '@src': resolve(__dirname, '../package/src'),
  '@scripts': resolve(__dirname, '../package/src/scripts'),
};

export const getInputFiles = (dir: string): string[] => {
  const files: string[] = [];

  const readDir = (directory: string): void => {
    const items = readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
      const itemPath = resolve(directory, item.name);

      if (item.isDirectory()) {
        readDir(itemPath);
      } else {
        files.push(itemPath);
      }
    }
  };

  readDir(dir);
  return files;
};
