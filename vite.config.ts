import fs from 'fs';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';

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
    acc['0'] = resolve(__dirname, 'demo', 'index.html');
    acc[(index + 1).toString()] = resolve(__dirname, current);
    return acc;
  }, {});
};

export default defineConfig({
  root: './demo',
  build: {
    assetsDir: '',
    outDir: 'build',
    target: 'ES6',
    cssCodeSplit: true,
    minify: 'terser',
    rollupOptions: {
      input: getInputVite(),
    },
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@package': resolve(__dirname, './package'),
      '@src': resolve(__dirname, './package/src'),
      '@scripts': resolve(__dirname, './package/src/scripts'),
    },
  },
});
