import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { resolveBrowserExecutable } from '../browser/native.mjs';

test('resolves the Chrome command reported by Cypress on Linux through PATH', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'vanilla-calendar-browser-path-'));
  try {
    const executable = path.join(directory, 'google-chrome');
    await fs.writeFile(executable, '#!/bin/sh\nexit 0\n', { mode: 0o755 });
    const searchPath = [path.join(directory, 'missing'), directory].join(path.delimiter);
    assert.equal(await resolveBrowserExecutable('google-chrome', searchPath), executable);
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
});

test('preserves the absolute browser path reported by Cypress on macOS', async () => {
  const executable = path.resolve('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  assert.equal(await resolveBrowserExecutable(executable, ''), executable);
});

test('does not silently switch to a different browser when Chrome cannot be found', async () => {
  await assert.rejects(resolveBrowserExecutable('nonexistent-calendar-browser', os.tmpdir()), /Cannot resolve/);
  await assert.rejects(resolveBrowserExecutable(undefined), /must report/);
});
