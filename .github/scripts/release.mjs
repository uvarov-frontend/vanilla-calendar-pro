import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const repository = 'uvarov-frontend/vanilla-calendar-pro';

export function releaseMetadata({ event, eventName, currentRepository, ref, source, built }) {
  assert.equal(eventName, 'release', 'Publishing requires a GitHub Release');
  assert.equal(event.action, 'published', 'The release must be published');
  assert.equal(currentRepository, repository, 'Publishing is restricted to the upstream repository');
  assert.equal(event.release.draft, false, 'Draft releases cannot be published');
  assert.equal(source.name, 'vanilla-calendar-pro', 'Unexpected package name');
  assert.equal(source.private, false, 'The release package must be public');
  assert.equal(source.repository.url, `https://github.com/${repository}.git`, 'The package repository must match the OIDC publisher');

  // Build metadata is intentionally excluded: npm normalizes it out of versions.
  const version = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([\da-zA-Z-]+(?:\.[\da-zA-Z-]+)*))?$/.exec(source.version);
  assert.ok(version, 'Use a canonical version such as 3.4.0 or 3.4.0-beta.1');
  assert.equal(version[0], source.version, 'The version must not contain surrounding whitespace');
  for (const identifier of version[4]?.split('.') ?? []) {
    assert.ok(!/^0\d+$/.test(identifier), 'Numeric prerelease identifiers must not have leading zeroes');
  }
  assert.equal(event.release.tag_name, `v${source.version}`, 'The release tag must match package/public/package.json');
  assert.equal(ref, `refs/tags/v${source.version}`, 'The workflow must run on the release tag');
  assert.equal(event.release.prerelease, Boolean(version[4]), 'The GitHub prerelease checkbox must match the package version');
  if (built) assert.deepEqual(built, source, 'The downloaded package manifest must match the tagged source');
  return { version: source.version, distTag: version[4] ? 'next' : 'latest' };
}

export function assertNewerStableVersion(version, latest) {
  const current = version.split('.').map(BigInt);
  const previous = latest.split('.').map(BigInt);
  assert.equal(current.length, 3, 'Expected a stable release version');
  assert.equal(previous.length, 3, 'Expected a stable latest version');
  const difference = current.findIndex((value, index) => value !== previous[index]);
  assert.ok(difference >= 0 && current[difference] > previous[difference], 'A stable release must be newer than the current npm latest');
}

async function main() {
  const root = path.resolve(import.meta.dirname, '../..');
  const readJson = async (file) => JSON.parse(await fs.readFile(file, 'utf8'));
  const sourceOnly = process.argv.includes('--source');
  const metadata = releaseMetadata({
    event: await readJson(process.env.GITHUB_EVENT_PATH),
    eventName: process.env.GITHUB_EVENT_NAME,
    currentRepository: process.env.GITHUB_REPOSITORY,
    ref: process.env.GITHUB_REF,
    source: await readJson(path.join(root, 'package/public/package.json')),
    built: sourceOnly ? undefined : await readJson(path.join(root, 'package/dist/package.json')),
  });
  const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  assert.equal(head, process.env.GITHUB_SHA, 'The checked-out commit must match the release event');
  if (!sourceOnly && metadata.distTag === 'latest') {
    const response = await fetch('https://registry.npmjs.org/vanilla-calendar-pro/latest', { signal: AbortSignal.timeout(15000) });
    assert.ok(response.ok, `Cannot check the current npm latest: HTTP ${response.status}`);
    assertNewerStableVersion(metadata.version, (await response.json()).version);
  }
  if (process.env.GITHUB_OUTPUT) {
    await fs.appendFile(process.env.GITHUB_OUTPUT, `version=${metadata.version}\ndist-tag=${metadata.distTag}\n`);
  }
  console.log(`Validated vanilla-calendar-pro@${metadata.version} for npm tag ${metadata.distTag}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await main();
