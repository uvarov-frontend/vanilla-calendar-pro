import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import postcss from 'postcss';

export const styleParts = ['core', 'motion', 'time', 'annotations', 'weeks', 'months'];
export const styleFamilies = ['', 'layout/', 'themes/light/', 'themes/dark/', 'themes/slate-light/'];
export const modularStyles = styleFamilies.flatMap((family) => styleParts.map((part) => `styles/${family}${part}.css`));

// Preserve each selector's declarations, fallback order, specificity and media conditions.
// Different selectors may be grouped or moved by the minifier; browser tests cover their cascade.
export function styleContract(css) {
  const values = new Map();
  postcss.parse(css).walkRules((rule) => {
    const context = [];
    for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent)
      if (parent.type === 'atrule') context.unshift(`@${parent.name} ${parent.params}`);
    for (const selector of rule.selectors) {
      rule.walkDecls((declaration) => {
        const key = [...context, selector, declaration.prop].join('\n');
        const list = values.get(key) ?? [];
        const value = declaration.value + (declaration.important ? '!important' : '');
        if (list.at(-1) !== value) list.push(value);
        values.set(key, list);
      });
    }
  });
  return [...values].sort(([a], [b]) => a.localeCompare(b, 'en'));
}

export async function assertStyleContracts(packed) {
  // Captured from the production CSS artifacts at ea08201, before splitting the styles.
  // Update only for an intentional styling change, with browser regression coverage.
  const expected = JSON.parse(await fs.readFile(new URL('./styles-contract.json', import.meta.url), 'utf8'));
  for (const [file, hash] of Object.entries(expected)) {
    const css = await fs.readFile(path.join(packed, 'styles', file), 'utf8');
    assert.equal(
      createHash('sha256')
        .update(JSON.stringify(styleContract(css)))
        .digest('hex'),
      hash,
      `${file} changed its styling contract`,
    );
  }
}

export async function assertModularStyles(packed, t) {
  const read = (file) => fs.readFile(path.join(packed, 'styles', file), 'utf8');
  const markers = {
    motion: /data-vc-(?:swipe|dragging|collapsing|clip|ghost)/,
    time: /data-vc-time|\.vc-time/,
    annotations: /data-vc-date-(?:popup|range-tooltip)|\.vc-date(?:__popup|-range-tooltip)/,
    weeks: /data-vc(?:-week-number|="?collapse)|\.vc-(?:collapse|week-number)/,
    months: /data-vc="?(?:grid|column|controls)|data-vc-type=multiple/,
  };
  for (const family of styleFamilies) {
    const parts = await Promise.all(styleParts.map((part) => read(`${family}${part}.css`)));
    const full = await read(family ? `${family.slice(0, -1)}.css` : 'index.css');
    assert.deepEqual(styleContract(parts.join('\n')), styleContract(full), `${family || 'root'} parts must reconstruct the full stylesheet`);
    for (const [index, css] of parts.entries()) {
      const part = styleParts[index];
      assert.match(css, /vanilla-calendar-pro v/);
      assert.doesNotMatch(css, /@(?:import|apply|tailwind)\b/, 'Every CSS file must work as a standalone CDN stylesheet');
      if (family === 'layout/') assert.doesNotMatch(css, /data-vc-theme|--vc-/, 'Layout modules must be theme-independent');
      if (family.startsWith('themes/')) {
        const theme = family.split('/')[1];
        postcss.parse(css).walkRules((rule) => {
          for (const selector of rule.selectors) assert.ok(selector.includes(`data-vc-theme=${theme}`), `${family}${part}: unscoped rule ${selector}`);
        });
      }
      // Theme-neutral parts are intentionally valid, empty CSS files, so all families have the same imports.
      if (family.startsWith('themes/') && ['motion', 'months'].includes(part)) assert.equal(styleContract(css).length, 0);
    }
  }
  for (const part of styleParts) {
    const css = await read(`${part}.css`);
    const separate = await Promise.all(['layout', 'themes/light', 'themes/dark'].map((family) => read(`${family}/${part}.css`)));
    assert.deepEqual(styleContract(css), styleContract(separate.join('\n')), `${part}: ready-made CSS must equal layout + light + dark`);
    for (const [feature, marker] of Object.entries(markers)) {
      if (part === feature) assert.match(css, marker);
      // Weeks supplies the static collapsed view, including selectors that recognize an active transition.
      else if (!(part === 'weeks' && feature === 'motion') && !(part === 'motion' && feature === 'weeks')) assert.doesNotMatch(css, marker);
    }
    t.diagnostic(`CSS ${part}: ${Buffer.byteLength(css)} bytes, gzip ${gzipSync(css, { level: 9 }).length}`);
  }
  const core = await read('core.css');
  const full = await read('index.css');
  assert.ok(Buffer.byteLength(core) <= 39000);
  assert.ok(gzipSync(core, { level: 9 }).length <= 3700);
  assert.ok(Buffer.byteLength(full) <= 55000);
  assert.ok(gzipSync(full, { level: 9 }).length <= 5650);
}
