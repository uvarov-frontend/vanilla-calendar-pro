# CI and releases

## Pull requests and main

`ci.yml` runs on pull requests targeting `main`, pushes to `main`, merge queues, and manual runs. `checks.yml` is shared with the release workflow:

- Biome and tests for the release guards and browser runner; actionlint also validates the workflow files.
- TypeScript, one package build, the demo build, and packed-package checks (exports, declarations, ZIP, tree shaking, ES2015 syntax, size budgets and date utilities).
- The full Cypress suite in Electron, Chrome, Firefox and WebKit, with separate parallel jobs. Chrome/WebKit also run native mouse/keyboard checks and all ten timezones.
- An `All checks passed` job that fails if any required job fails, is skipped or is cancelled. Select the check shown as `Checks / All checks passed` in the repository's branch rules after its first run. Remove the old `cypress` requirement if it was configured.

Node and pnpm versions come from `package.json`. CI uses the frozen lockfile, caches the pnpm store and browser binaries, and cancels superseded PR runs. Main runs finish in sequence so an in-progress server copy is not interrupted. Actions are pinned to commit SHAs; Dependabot maintains them. Release runs install without restoring these caches.

All browser jobs download `package-dist` from the build job. They do not rebuild the library. JSON results and failure screenshots are stored outside the checkout and uploaded as `browser-results-<browser>` for 14 days; package test output is available as `package-test-results`. The built package is retained for 7 days. Runner setup failures are visible in the job logs even when no test report exists.

Ubuntu 24.04 GitHub-hosted runners provide Chrome and Firefox; the workflow installs Cypress and the locked Playwright WebKit version with its system libraries. Browser versions are recorded in the reports. These tests exercise current engines, not historical minimum browser versions or physical touch devices. Performance benchmarks remain a separate local comparison: timing on shared CI machines is not a release threshold.

After successful checks on a push to upstream `main`, the existing server deployment uses the `HOST`, `USERNAME`, `PORT`, `KEY` and `TARGET` repository secrets. It copies tracked repository files into the existing target layout, without `.git` or dependencies, then replaces only the generated `package/dist` directory with the tested build. Replacing that directory also removes obsolete build files; the rest of the server target is preserved. No server-side build is needed. This deployment is independent of npm publishing; PRs, forks and manual CI runs never deploy.

## One-time npm configuration

First merge these workflows into `main`. In the npm settings for **vanilla-calendar-pro**, add a **Trusted Publisher → GitHub Actions** with:

| Field | Value |
| --- | --- |
| Organization or user | `uvarov-frontend` |
| Repository | `vanilla-calendar-pro` |
| Workflow filename | `publish.yml` |
| Environment name | Leave empty; the workflow does not use a GitHub environment |
| Allowed actions | Enable direct publishing with `npm publish` |

The filename is case-sensitive and has no `.github/workflows/` prefix. New npm trusted publishers may initially allow only staged publishing; this workflow requires direct publishing. No `NPM_TOKEN`, `NODE_AUTH_TOKEN` or other npm secret is needed. OIDC permission is granted only to the final publish job. See [npm's Trusted Publishing documentation](https://docs.npmjs.com/trusted-publishers/).

The release job installs npm **12.0.2**, which supports OIDC and the project's Node version. The rest of the project continues to use pnpm. The publisher has no project dependency installation or build step: it downloads the package that passed the complete release checks.

## Publish a version

1. Change `version` in **`package/public/package.json`** and merge the change into `main`. The root `package.json` is a private development project and stays at `0.0.0`; never edit generated `package/dist` to set a version.
2. In GitHub **Releases → Draft a new release**, create/select a tag matching the package version, for example `v3.4.0`, on that merged commit. Add the release notes.
3. For a prerelease such as `4.0.0-beta.1`, use tag `v4.0.0-beta.1` and enable **Set as a pre-release**. For a stable version, leave that checkbox off.
4. Publish the GitHub Release. `publish.yml` validates the version/tag, checks that the tagged commit belongs to `main`, runs the complete shared checks, then publishes the tested build with provenance.
5. Check that the **Publish npm package** workflow succeeds. Stable versions receive npm's `latest` tag; all prereleases receive `next`. `package.zip` remains inside the npm package for CDN downloads.

Creating a tag alone, saving a draft or editing an existing release does not publish to npm. Both stable and prerelease publication use the `release: published` event. No workflow modifies versions, commits, tags or release notes automatically. Versions must be canonical `X.Y.Z` or `X.Y.Z-prerelease`; build metadata (`+...`) is intentionally unsupported.

The source and downloaded package manifests must match. A stable version must be newer than the registry's current `latest`, preventing an older maintenance release or rerun from moving `latest` backwards. This workflow is for the current release line; publishing an older line under another dist-tag needs a separate explicit policy.

Publishing runs are serialized and are not interrupted by newer runs. Finish one release before starting another: GitHub concurrency retains only one pending run. If a run fails before publication, correct the configuration and rerun it. npm does not allow replacing a published version; after publication, changes require a new version. A GitHub Release may already be public while checks are running or if npm publication fails; its existence is not proof of a successful npm publish.

## Local validation

```sh
pnpm test:ci       # Release guards and cross-platform browser path resolution
pnpm lint
pnpm test:package
```

With [actionlint](https://github.com/rhysd/actionlint) installed, run `actionlint` from the checkout to validate workflow syntax, expressions and shell commands. Browser commands are documented in [tests/browser/README.md](../tests/browser/README.md).

To preview npm contents without uploading anything, build first, then run `npm pack --dry-run --json` from `package/dist`. After setting an unpublished version, you can also run `npm publish --dry-run --ignore-scripts --access public` there (add `--tag next` for a prerelease). npm may reject even a publish dry run if that version already exists. A dry run does not validate the npm trust relationship: that requires the first real GitHub release after the npm configuration is saved.
