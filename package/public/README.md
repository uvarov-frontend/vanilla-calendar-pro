# Vanilla Calendar Pro - Lightweight and Functional JavaScript Plugin for Date and Time Selection

[![vanilla-calendar preview](https://vanilla-calendar.pro/vanilla-calendar-preview-v3.png?v1)](https://vanilla-calendar.pro)

[![version](https://img.shields.io/npm/v/vanilla-calendar-pro.svg)](https://npmjs.com/package/vanilla-calendar-pro)
[![tests](https://github.com/uvarov-frontend/vanilla-calendar/actions/workflows/pull_request.yml/badge.svg)](https://github.com/uvarov-frontend/vanilla-calendar/actions/workflows/pull_request.yml)
[![downloads](https://img.shields.io/npm/dm/vanilla-calendar-pro.svg)](https://npmjs.com/package/vanilla-calendar-pro)

This is a versatile JavaScript date and time picker component with TypeScript support, compatible with any JavaScript frameworks and libraries. It is designed to be lightweight, easy to use, and feature-rich, without relying on external dependencies.

## Key Features

- **Lightweight**: The final JavaScript file is minified and optimized for fast loading.
- **No Dependencies**: Completely self-contained, ensuring you don't need to include additional libraries.
- **Simple Localization**: Supports simple localization for any language.
- **Customizable**: Can be easily configured using CSS and HTML markup, including CSS custom properties for theme colors.
- **Multiple Instances**: Allows for an unlimited number of calendar instances on a single page.
- **Theme Support**: Supports automatic theme switching between light and dark modes, as well as custom user-defined themes.
- **Week Start Customization**: Supports any day of the week as the starting day.
- **Custom Weekends**: Define custom weekend days for each week as needed.
- **Week Number Display**: Can display week numbers throughout the year.
- **Week View and Gestures**: A single-week calendar type, plus optional swipe navigation and collapsing a month down to one week.
- **Animated Transitions**: Optional sliding, cross-fading, and collapsing animations, with `prefers-reduced-motion` respected.
- **Not Tied to Input Tags**: Unlike many date pickers, it's not limited to the `<input>` tag.
- **Shadow DOM Support**: Can be initialized inside a Shadow DOM for encapsulated Web Components.
- **Accessible**: ARIA grid semantics, arrow-key navigation with a single tab stop per grid, managed focus, and localizable ARIA labels.
- **Date and Time Range Selection**: Supports selecting ranges for both dates and times, with maximum and minimum limits.
- **Popups and Tooltips**: Allows setting custom popups with user-defined information—including a single popup for a date range—and provides tooltips on hover in date range selection mode.

## Browser Support

VanillaCalendar is compatible with a wide range of browsers:

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
57+ ✔ | 52+ ✔ | 80+ ✔ | 44+ ✔ | 10.1+ ✔ |

## Support and Feedback

Vanilla Calendar Pro is free to use for everyone, but maintaining it comes with costs. I personally cover expenses like hosting, domain, and development resources to keep the project running smoothly. Your donations help me continue improving the tool while keeping it accessible for the community. Any contribution, big or small, makes a difference!

If you’d like to support the project, please consider making a donation or giving it a 🌟 star on [GitHub](https://github.com/uvarov-frontend/vanilla-calendar-pro).

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://buymeacoffee.com/uvarov)

Feel free to report any issues or share your ideas—your feedback is invaluable!

## Getting Started

### Installation

You can install it using `npm`, `pnpm`, or `yarn`:

```sh
npm install vanilla-calendar-pro
# or
pnpm add vanilla-calendar-pro
# or
yarn add vanilla-calendar-pro
```

### Usage

Here's a simple example of using it in your HTML:

```html
<html>
  <head>
  </head>
  <body>
    <div id="calendar"></div>
    <!-- or -->
    <!-- <input type="text" id="calendar-input"> -->
  </body>
</html>
```

To add the necessary styles and scripts, you can use the following code:

```js
import { Calendar } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/index.css';

// Initialize the calendar
const calendar = new Calendar('#calendar');
calendar.init();
// or
// const calendarWithInput = new Calendar('#calendar-input', { inputMode: true });
// calendarWithInput.init();
```

### Optional features in ESM

`motion` provides animations, swipe navigation and month/week collapse. `timePicker` provides the 12/24-hour time editor. `datePopups` provides date popup content and modifiers, including date ranges. ESM bundlers can remove extensions that you do not import and register.

```ts
import { Calendar, motion, timePicker, datePopups } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/index.css';

const calendar = new Calendar('#calendar', {
  extensions: [motion, timePicker, datePopups],
  animation: true,
  selectionTimeMode: 24,
  popups: { '2026-09-21': { html: 'Event' } },
});
calendar.init();
```

When upgrading from a version without extensions, keep your existing options and callbacks. For ESM, add the named import and register `motion` in the constructor with `extensions: [motion]`. Do not call the extension. Importing or registering it does not enable the feature by itself.

Extensions are fixed at construction. Register modules you will enable later through `set()` or `update()`. Those methods still change the existing feature options; they cannot add or remove modules. Reusing the same options or extensions array is supported; each calendar has independent state. Enabling a feature without its extension throws a descriptive error at `init()`, `set()` or `update()`; inactive settings and callbacks do not require a module.

Input calendars, date/range selection, month/year pickers, week view and range tooltips remain in the core. The full classic `<script>` / CommonJS distribution includes all three extensions automatically. CSS imports stay the same.

## CSS Styles

```js
// Only layout calendar
import 'vanilla-calendar-pro/styles/layout.css';

// Themes
import 'vanilla-calendar-pro/styles/themes/light.css';
import 'vanilla-calendar-pro/styles/themes/dark.css';
// ...and others
```

The calendar can automatically switch between a light or dark theme depending on the user's system settings, or track a custom HTML attribute that specifies the desired theme.

- The `index.css` file contains all the styles from the `layout.css` file, as well as the light and dark theme styles.
- The `layout.css` file contains the essential structural styles for the calendar.
- The `themes/light.css` theme provides a light color scheme.
- The `themes/dark.css` theme offers a dark color scheme.
- ...and others

If you want to apply a specific theme, it is recommended to import `layout.css` along with your preferred theme instead of `index.css`.

## Layouts

The calendar contains custom `layouts` for each calendar type, which allow you to change the calendar structure to suit your needs.
Each layout contains its own set of components that can be moved or removed from it if necessary. By default, a layout contains all the components available to it.
Components are identified by tags containing the `#` character, and they must contain a slash at the end of the tag.

Here is an example of the default layout:

```js
new Calendar('#calendar', {
  layouts: {
    default: `
      <div class="vc-header" data-vc="header" role="group" aria-label="Calendar Navigation">
        <#ArrowPrev [month] />
        <div class="vc-header__content" data-vc-header="content" aria-live="polite" aria-atomic="true">
          <#Month />
          <#Year />
        </div>
        <#ArrowNext [month] />
      </div>
      <div class="vc-wrapper" data-vc="wrapper">
        <#WeekNumbers />
        <div class="vc-content" data-vc="content" role="grid">
          <#Week />
          <#Dates />
          <#DateRangeTooltip />
        </div>
      </div>
      <#Collapse />
      <#ControlTime />
    `
  }
});
```

## Library components

For detailed instructions on how to use the calendar as a component for various libraries, please visit the [website](https://vanilla-calendar.pro/docs/learn) with detailed documentation and examples.

## API Reference

For detailed information on the available parameters and settings, please refer to the [API reference](https://vanilla-calendar.pro/docs/reference).

## Sponsor

This project is tested with BrowserStack.

## Development

Automatic checks, server deployment and npm Trusted Publishing are described in the [CI and release guide](https://github.com/uvarov-frontend/vanilla-calendar-pro/blob/main/.github/README.md).

Use the Node and pnpm versions pinned in `package.json` (`engines.node` and `packageManager`; enable pnpm with `corepack enable`). CI reads its Node version from the same file. From the repository checkout:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm lint:fix
pnpm package:build
pnpm test:package
pnpm test:cypress
```

Biome handles code formatting, linting, and import sorting. `pnpm format:check` only checks formatting. Generated builds and the lockfile are excluded. CSS specificity and `!important` rules are disabled because calendar modifiers and demo overrides intentionally use the cascade; browser fallback declarations are kept.

Tailwind stays on stable 3.4 to preserve browser compatibility. TypeScript 6 is used while declaration tooling still depends on its compiler API; Cypress 15 matches the supported peer range of `cypress-axe`. These are development dependencies and are not included in the published calendar. Deployments that build from source need the same Node/pnpm versions as CI.

Package builds use Vite/Rolldown with Oxc compression and final Terser minification, targeting ES2015 with Terser's Safari 10 workaround. ESM annotations are preserved for consumer tree shaking; CSS imports are marked as side effects. Declarations for both entry points are generated together. CSS uses Tailwind 3, Autoprefixer and cssnano. The standalone `package/dist/package.zip` is intentionally included in the npm package so it can be downloaded through a CDN.

`pnpm test:package` builds and packs the actual distribution in an OS temporary directory. It checks package contents, ESM/CommonJS/browser-global/AMD exports, ES2015 syntax, raw JS size budgets, consumer tree shaking (including CSS retention), and every example against the packed TypeScript declarations in bundler and NodeNext resolution modes. It requires `tar` and cleans up its temporary files. Size budgets live in `tests/package/package.test.mjs`; review any increase before changing them. Syntax checks do not replace testing on the oldest supported browsers.

`pnpm test:cypress` checks the packed library in a browser, including every example, public methods, date/time selection, input integration, gestures, Shadow DOM and accessibility. `pnpm test:cypress:browsers` runs Chrome, Firefox and experimental WebKit sequentially, with additional native-input checks in Chrome/WebKit. `pnpm test:timezones` checks calendar behavior in 10 timezones in Chrome and WebKit. Reports and failure screenshots stay in an OS temporary directory. See [the browser test guide](https://github.com/uvarov-frontend/vanilla-calendar-pro/blob/main/tests/browser/README.md) for prerequisites, focused runs and coverage details.

## Performance checks

For contributors, [the performance harness](https://github.com/uvarov-frontend/vanilla-calendar-pro/blob/main/tests/performance/README.md) compares the working tree with a Git revision, measures production bundles, and checks rendering and lifecycle behavior. Start with `pnpm test:performance --suite=all --quick` from the repository checkout; results are saved outside the repository.

## License

MIT License

## Author

Yury Uvarov (*uvarov.frontend@gmail.com*)
