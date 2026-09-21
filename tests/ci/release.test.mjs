import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assertNewerStableVersion, releaseMetadata } from '../../.github/scripts/release.mjs';

const fixture = (version = '3.4.0', prerelease = false) => {
  const source = {
    name: 'vanilla-calendar-pro',
    version,
    private: false,
    repository: { url: 'https://github.com/uvarov-frontend/vanilla-calendar-pro.git' },
  };
  return {
    event: { action: 'published', release: { tag_name: `v${version}`, draft: false, prerelease } },
    eventName: 'release',
    currentRepository: 'uvarov-frontend/vanilla-calendar-pro',
    ref: `refs/tags/v${version}`,
    source,
    built: structuredClone(source),
  };
};

test('stable releases publish to latest', () => {
  assert.deepEqual(releaseMetadata(fixture()), { version: '3.4.0', distTag: 'latest' });
});

for (const suffix of ['alpha.1', 'beta.2', 'rc.3', 'preview-test.0']) {
  test(`${suffix} releases publish to next without changing latest`, () => {
    assert.deepEqual(releaseMetadata(fixture(`4.0.0-${suffix}`, true)), { version: `4.0.0-${suffix}`, distTag: 'next' });
  });
}

for (const [title, change] of [
  ['a manual workflow run', (input) => (input.eventName = 'workflow_dispatch')],
  ['an edited release', (input) => (input.event.action = 'edited')],
  ['a fork', (input) => (input.currentRepository = 'someone/vanilla-calendar-pro')],
  ['a draft', (input) => (input.event.release.draft = true)],
  ['the root project package', (input) => (input.source.name = 'vanilla-calendar-pro-project')],
  ['a private package', (input) => (input.source.private = true)],
  ['a different provenance repository', (input) => (input.source.repository.url = 'https://github.com/someone/calendar.git')],
  ['a tag/version mismatch', (input) => (input.event.release.tag_name = 'v3.5.0')],
  ['a branch ref', (input) => (input.ref = 'refs/heads/main')],
  ['a stable version marked as prerelease', (input) => (input.event.release.prerelease = true)],
  ['an artifact with a different version', (input) => (input.built.version = '3.3.2')],
  ['an artifact with changed exports', (input) => (input.built.exports = './wrong.js')],
]) {
  test(`rejects ${title}`, () => {
    const input = fixture();
    change(input);
    assert.throws(() => releaseMetadata(input));
  });
}

test('rejects a prerelease marked as stable', () => {
  assert.throws(() => releaseMetadata(fixture('4.0.0-beta.1', false)));
});

for (const version of ['v3.4.0', '3.4', '03.4.0', '3.4.0-beta.01', '3.4.0-', '3.4.0+build.1', '3.4.0\n', '3.4.0\ninjected=true']) {
  test(`rejects noncanonical version ${JSON.stringify(version)}`, () => {
    assert.throws(() => releaseMetadata(fixture(version)));
  });
}

test('source validation works before a build exists', () => {
  const input = fixture();
  delete input.built;
  assert.equal(releaseMetadata(input).version, '3.4.0');
});

test('latest advances numerically across patch, minor and major versions', () => {
  for (const [version, latest] of [
    ['3.3.3', '3.3.2'],
    ['3.10.0', '3.9.9'],
    ['4.0.0', '3.99.99'],
  ])
    assert.doesNotThrow(() => assertNewerStableVersion(version, latest));
});

test('retries and older releases cannot move latest backwards', () => {
  for (const version of ['3.4.0', '3.3.99', '2.99.99']) assert.throws(() => assertNewerStableVersion(version, '3.4.0'));
});
