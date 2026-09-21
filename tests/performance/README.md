# Calendar performance checks

This harness preserves the repeatable parts of the calendar performance audit. It measures real production builds and checks that faster rendering preserves behavior. No chat history, saved `/tmp` baseline, manually built `dist`, or additional dependencies are needed.

## Run

Requirements: Node 22+, installed project dependencies (`npm install`), Git, `tar`, and a recent Chrome or Chromium. The runner supports macOS/Linux and finds common browser locations. Set `CHROME_PATH` to an executable if necessary. The Node/browser requirement is for the development harness; the library's supported browser versions do not change.

```sh
# Exercise the runner and all checks with a small timing sample.
npm run test:performance -- --suite=all --quick

# Compare uncommitted changes against the current commit.
npm run test:performance -- --baseline=HEAD

# Compare with the optimized checkpoint, even after later commits.
npm run test:performance -- --baseline=bfb110f --suite=all --samples=20 --rates=1,4,8

# Run all 30 timing scenarios rather than the 13 default scenarios.
npm run test:performance -- --only=all --rates=4

# Focus on a suspected regression.
npm run test:performance -- --only=set-selected-date,navigate-12-months --rates=4 --samples=30

# Check behavior, memory, or cold startup independently.
npm run test:performance -- --suite=checks
npm run test:performance -- --suite=extended --groups=memory,multiple,rapid --rates=1,4
npm run test:performance -- --suite=extended --groups=startup --samples=15 --rates=1,4

# Save profiles for both versions; load .cpuprofile in Chrome DevTools.
npm run test:performance -- --profile --only=navigate-12-months --rates=4

npm run test:performance -- --help
```

Both versions are freshly built with `npm run package:build` in temporary directories, using the same installed dependencies. The current snapshot includes tracked and non-ignored untracked files, including unstaged edits and deletions. The baseline is resolved to a full Git commit. No checkout, reset, dependency installation, commit or push is performed. The repository's `package/dist` is not used or modified.

The runner prints the results directory and writes:

- `report.md`: timing tables, bundle sizes, checks and startup summaries.
- `report.json`: individual samples, medians/p90, options, baseline/current revisions, working-tree status, source/bundle/harness hashes, dependency versions, hardware/browser details and failures.
- `build-baseline.log`, `build-current.log`: build output.
- `bundles/`: the exact measured JS/CSS artifacts.
- `*.cpuprofile`: when profiling is requested.

Results default to a new OS temporary directory. To retain a run, pass `--output=/absolute/path/to/new-directory` outside the repository, or copy its printed directory somewhere durable. The output directory must be empty. Build snapshots and the temporary Chrome profile are cleaned up after the run; reports remain. Temporary files can be removed by the OS, so keep reports needed for long-term comparisons elsewhere.

## Coverage

| Suite | What it exercises |
| --- | --- |
| `timing` | Creation; `set({ selectedDates })` with 1/3/12 months; navigation with 1/2/3/12 months, backwards and with larger steps; large ranges and 5000 unsorted disabled dates. `--only=all` also covers callbacks, week view/numbers, holidays, popups, month/year pickers, keyboard navigation, time changes, long range selection and multiple locales. |
| `checks` | 38 public-API scenarios compared against the baseline in each of 5 timezones. DOM including attributes, whitespace and input values; context, focus, reset controls, callbacks, custom layouts/sanitizer, external mutations, input mode, reentrant updates, year boundaries and retained DOM identity. |
| `extended` | 300 create/update/destroy cycles after warmup with forced GC; 40 instrumented resource-cleanup cycles; concurrent calendars; native pointer gestures interrupted by set/destroy; rapid input open/hide; isolated cold startup for ordinary, input and rich calendars. |
| `all` | These suites in sequence. |

`--quick` uses 3 timing/startup samples and CPU 1× unless overridden. It does not shorten correctness or memory checks. It verifies the harness, **not** a speedup. `--groups` selects extended checks; `--only` selects timing scenarios. The existing Cypress suite remains the broader API/accessibility/browser-interaction regression suite.

## Interpret results

Timing uses 3 warmups followed by 20 samples by default. Revisions alternate, and their order reverses between samples. For interactions, calendar creation and settling happen before the measurement. The measured interval includes the synchronous operation and forced layout, with the real layout stylesheet. Each timing sample creates a fresh instance; library caches are warm after warmup.

The speedup is baseline median divided by current median. Values below 1 mean a slowdown. Always inspect absolute milliseconds, p90 and control scenarios such as `init-month` and `navigate-month`. A large speedup in a 12-month calendar does not imply the same gain for one month or custom rendering.

CPU 1×/4×/8× uses CDP throttling relative to the current machine. It is not a calibrated low-end phone or an FPS measurement. Run on an otherwise idle machine; do not run builds, Cypress, profiles or other benchmarks concurrently. Repeat a suspicious result in the same environment. Timing differences do not automatically fail the command because host noise would make such a gate unreliable. Exceptions, rendering differences and lifecycle-budget failures do return a nonzero exit code. A failed report is saved with the error and completed checks.

Cold startup uses a fresh browser context with HTTP caching disabled for each sample. Modules and CSS are served uncompressed from localhost. Library caches start empty, while the browser process and OS remain warm. Readiness includes input timers, popup placement and two rendering opportunities; it does not measure physical screen presentation or a mobile network. Frame scheduling adds noise.

The compared layout CSS must be identical: this harness isolates JavaScript changes. A CSS mismatch stops the run instead of attributing style changes to JavaScript. Public declaration hashes and JS/CSS sizes are reported; a declaration change is informational, while rendering parity is enforced. Bundle sizes are raw bytes, gzip level 9 and Brotli quality 11.

Memory checks assert no live probed calendars/nodes after GC, no event-listener growth, at most 20 additional DOM nodes and less than 1 MiB retained JS-heap growth across 300 cycles. Separately instrumented cycles require zero remaining global listeners, MutationObservers, timers and animation frames after destroy. These are regression checks over a finite run, not proof of the absence of every leak.

## Context for future work

- `f327ffe`: initial rendering and lifecycle optimization checkpoint, before the later rule caches and DOM reuse.
- `bfb110f`: optimized checkpoint including date-rule/locale caches, selective date updates and reuse of overlapping month columns. Use this as a fixed baseline for future work. Comparing it with `f327ffe` includes both later optimization stages; it does not reproduce an intermediate working-tree-only baseline from the original audit.
- API and browser support must remain compatible unless a task explicitly changes that requirement: Chrome 57+, Firefox 52+, Edge 80+, Opera 44+, Safari 10.1+; production target ES6. Running this harness in recent Chrome does not validate historical browsers.
- Fast DOM reuse is deliberately conservative. Custom creation callbacks, layouts/sanitizers, animation/collapse, popups, gap rules, external DOM edits and focus requirements can require the original rendering path. Do not force reuse merely to improve the benchmark.
- Caches must notice in-place changes to dates/rules and timezone changes, remain bounded, and release per-instance resources on destroy.
- Do not trade callback order, focus, keyboard behavior or cleanup for a faster timing number. Check raw bundle growth as well as compression. The last DOM changes added roughly 4 KiB of raw ESM; first creation and simple navigation were not made faster by that work.
- Previous prototypes that moved date rows between containers caused unnecessary style/layout work. Retaining whole month columns produced the meaningful navigation gain.

When continuing in another chat, point to this file and name the slow real-world scenario. A useful starting instruction is: “Read tests/performance/README.md, compare the working tree against bfb110f, inspect timing and bundle regressions, preserve the existing API/browser floor, and keep generated reports outside the repository.”

## Maintain the harness

`scenarios.browser.mjs` contains timing fixtures; `rendering.browser.mjs` contains public-API parity checks; `lifecycle.browser.mjs` contains memory/interaction/startup fixtures. Node runners handle build snapshots, CDP, measurements and reports. Add scenarios here when a real regression is found. Keep fixtures fixed and deterministic. Change parity expectations intentionally when the API/markup contract is intentionally changed.

The runner needs the selected revision to support the relevant API and existing build command. It shares current installed build tools between revisions to isolate source changes. It does not recreate historical dependency installations. If build dependencies change incompatibly, compare compatible revisions or adapt the harness explicitly rather than silently using a stale `dist`.
