import fs from 'node:fs';

// Use the same early theme bootstrap in Vite dev, static builds and browser fixtures.
/** @returns {import('vite').Plugin} */
export function devSiteThemePlugin() {
  return {
    name: 'workbench-theme',
    transformIndexHtml(html) {
      if (!html.includes('class="dev-app"')) return;
      return {
        html: html.replace(/<meta charset="UTF-8"\s*\/?>/i, ''),
        tags: [
          { tag: 'meta', attrs: { charset: 'UTF-8' }, injectTo: 'head-prepend' },
          { tag: 'meta', attrs: { name: 'color-scheme', content: 'light dark' }, injectTo: 'head-prepend' },
          { tag: 'style', children: fs.readFileSync(new URL('../demo/theme.css', import.meta.url), 'utf8'), injectTo: 'head-prepend' },
          { tag: 'script', children: fs.readFileSync(new URL('../demo/theme-init.js', import.meta.url), 'utf8'), injectTo: 'head-prepend' },
        ],
      };
    },
  };
}
