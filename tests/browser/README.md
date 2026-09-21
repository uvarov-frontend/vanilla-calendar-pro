# Browser regression tests

Run from the repository checkout with the Node and pnpm versions in `package.json`:

```sh
pnpm install --frozen-lockfile
pnpm test:cypress                 # Build, pack, and run all specs in bundled Electron
pnpm test:examples                # All documentation examples and public API scenarios
pnpm test:cypress:a11y            # Accessibility scenarios
pnpm test:cypress:browsers        # Chrome, Firefox, WebKit, sequentially
pnpm test:timezones               # Calendar behavior in 10 timezones, Chrome and WebKit
pnpm test:timezones --browsers=chrome
pnpm test:cypress --browser firefox --spec cypress/e2e/api.cy.ts
pnpm cypress:open                 # Interactive runner with the same packed fixture

# Reuse a build while working on tests. Rebuild after any library change.
pnpm package:build
pnpm cypress:run --spec cypress/e2e/distribution.cy.ts

# Package exports, declarations, tree shaking, size and date utilities
pnpm test:package
```

Chrome and Firefox must be installed separately. WebKit is provided by the pinned `playwright-webkit` development dependency and uses Cypress's experimental WebKit support. On Linux its system libraries may need installation with `pnpm exec playwright install-deps webkit`. The default Electron run requires no separately installed browser. Browser engines run one at a time.

`run.mjs` packs `package/dist` using `pnpm pack`, extracts it into a temporary consumer project, starts Vite on an available localhost port, and invokes Cypress. The real `examples/*.ts` files import the extracted package without changing their options. Existing demo pages resolve `@src/index` and styles to the same published artifacts. API fixtures exercise ESM imports and classic script globals; no library TypeScript is compiled by this fixture server.

The command prints an OS temporary directory containing a JSON result for each browser and screenshots of failures. A failure, missing tests, or skipped/pending tests causes a nonzero exit status. Fixtures and the server are cleaned up on completion; reports remain outside the repository. CI builds the package once, then downloads that artifact into four parallel browser jobs. Chrome/WebKit also run native input and timezone checks. Reports and screenshots are uploaded as GitHub Actions artifacts; see [CI and releases](../../.github/README.md).

## Coverage and maintenance

- `cypress/e2e/examples.cy.ts`: every current example, with assertions for its documented interactions. Its inventory test compares scenarios with `examples/*.ts`; adding or renaming an example requires updating the scenario map. Input examples also need an input host in `tests/browser/server.mjs`.
- `cypress/e2e/api.cy.ts`: public methods, callbacks, reset controls, independent instances, date boundaries, range modes, input lifecycle/positioning, time validation, customization and keyboard behavior.
- `cypress/e2e/distribution.cy.ts`: browser globals loaded by ordinary script tags, including range selection, input/time integration and utility exports.
- Existing specs: animation and interruption, reduced motion, swipes, collapse/week views, Shadow DOM, range popups, gap rules, lifecycle cleanup, ARIA and keyboard focus.
- `tests/package/package.test.mjs`: package contents (including the CDN ZIP), ESM/CommonJS/AMD/globals, ES2015 parsing, raw bundle budgets, consumer tree shaking, styles, and all example types against the packed declarations. Utility assertions run in five timezones and cover leap years, week boundaries and DST, including historical midnight transitions.
- `tests/browser/native.mjs`: five checks using real mouse/keyboard input, including Enter, pointer capture outside the calendar, collapse/expand, and interruption by `set()`/`destroy()`. Full Chrome/WebKit runs execute these after Cypress. Cypress gesture specs use a scoped capture shim for synthetic pointers, which browsers do not consistently register as active hardware pointers; these native checks do not use the shim.
- `tests/browser/timezones.mjs`: 14 scenarios in each of 10 timezones, in both Chrome and WebKit. Covers rendered selection and callback/input values, inclusive ranges across leap days/year boundaries/DST, local Date objects and timestamps, min/max/disabled rules, week numbers, and local today/past-date restrictions at two fixed instants. `pnpm test:timezones` runs this matrix separately and saves results outside the repository.

New examples and API tests freeze only `Date`, leaving animation and input timers running normally. The random-price example uses a fixed random value. Use retryable DOM assertions instead of fixed sleeps; requery elements after interactions that replace markup. Native keyboard activation is covered separately because Cypress's `cy.press()` does not support WebKit.

Date-only strings such as `2024-06-20` represent local calendar dates and must not shift with timezone. `Date` objects and numeric timestamps represent instants and intentionally resolve to the user's local date; `today` also follows local time. The timezone matrix asserts these distinctions rather than demanding identical output where different local dates are correct. It covers UTC, Moscow, Berlin, New York, Los Angeles, São Paulo, Tokyo, Kathmandu, Sydney and Kiritimati (UTC+14). It is a finite regression matrix, not proof for every historical timezone transition.

These are functional regression tests, not a claim of 100% statement/branch coverage. Recent Chromium, Firefox and WebKit runs do not validate the oldest supported browsers, real touch hardware, screen readers or every OS/locale combination. The ES2015 syntax check protects the build target; the library's browser support policy is unchanged.

Performance and resource-cleanup comparisons are maintained separately in [the performance harness](../performance/README.md). Do not run timing benchmarks alongside Cypress or builds.
