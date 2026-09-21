import fs from 'node:fs';
import path, { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { devSiteThemePlugin } from './config/dev-site.mjs';

const getInputVite: () => { [key: string]: string } = () => {
  const pages: string[] = [];

  function fromDir(startPath: string, filter: string): void {
    if (!fs.existsSync(startPath)) {
      console.log('no dir ', startPath);
      return;
    }

    const files: string[] = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
      const filename: string = path.join(startPath, files[i]);
      const stat: fs.Stats = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        fromDir(filename, filter);
      } else if (filename.endsWith(filter)) {
        pages.push(filename);
      }
    }
  }

  fromDir('./demo/pages', '.html');

  return pages.reduce((acc: { [key: string]: string }, current: string, index: number) => {
    acc['0'] = resolve(import.meta.dirname, 'demo', 'index.html');
    acc[(index + 1).toString()] = resolve(import.meta.dirname, current);
    return acc;
  }, {});
};

export default defineConfig({
  plugins: [devSiteThemePlugin()],
  root: './demo',
  build: {
    assetsDir: '',
    outDir: 'build',
    target: 'es2015',
    cssCodeSplit: true,
    minify: 'terser',
    rolldownOptions: {
      input: getInputVite(),
    },
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './'),
      '@package': resolve(import.meta.dirname, './package'),
      '@src': resolve(import.meta.dirname, './package/src'),
      '@scripts': resolve(import.meta.dirname, './package/src/scripts'),
    },
  },
});
