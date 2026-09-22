<p align="center">
  <a href="https://vanilla-calendar.pro">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/uvarov-frontend/vanilla-calendar-pro/main/.github/assets/preview-dark.png">
      <img src="https://raw.githubusercontent.com/uvarov-frontend/vanilla-calendar-pro/main/.github/assets/preview.png" alt="Vanilla Calendar Pro. Built for developers. Ready for users. Lightweight at its core. Flexible in every detail. Packed with features to make it your own. Date range, time and week views in the built-in light and dark themes." width="1280">
    </picture>
  </a>
</p>

<h1 align="center">Vanilla Calendar Pro</h1>

<p align="center">
  A flexible JavaScript date and time picker.<br>
  Zero dependencies. TypeScript support. At home in any framework.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vanilla-calendar-pro"><img src="https://img.shields.io/npm/v/vanilla-calendar-pro?color=0891b2&amp;labelColor=161b22" alt="npm version"></a>
  <a href="https://github.com/uvarov-frontend/vanilla-calendar-pro/actions/workflows/ci.yml"><img src="https://github.com/uvarov-frontend/vanilla-calendar-pro/actions/workflows/ci.yml/badge.svg?branch=main" alt="Tests"></a>
  <a href="https://www.npmjs.com/package/vanilla-calendar-pro"><img src="https://img.shields.io/npm/dm/vanilla-calendar-pro?color=0891b2&amp;labelColor=161b22" alt="Monthly npm downloads"></a>
</p>

<p align="center">
  <a href="https://vanilla-calendar.pro/docs/learn">Documentation &amp; examples</a> ·
  <a href="https://vanilla-calendar.pro/docs/reference">API reference</a> ·
  <a href="https://github.com/uvarov-frontend/vanilla-calendar-pro/releases">Releases</a>
</p>

## A calendar that fits your product

From a simple date field to a booking flow, Vanilla Calendar Pro gives you control over what users can pick and how it looks.

- **Zero dependencies.** Use it with plain JavaScript or your favorite framework. TypeScript definitions are included.
- **Small by choice.** Import only the features and CSS you need; unused extensions stay out of your application bundle.
- **Fast interactions.** Responsive navigation and selection, with efficient handling of large date lists and ranges.
- **Flexible date selection.** Pick one date, several dates or a continuous range. Set initial selections and react to changes.
- **The view you need.** Show a month, several months side by side or a compact week. Jump straight to a month or year.
- **Time, too.** Add a 12- or 24-hour time picker, with configurable limits, steps and controls.
- **Your availability rules.** Limit dates, disable weekdays, block individual dates or ranges, or enable only specific days.
- **Any language and locale.** Localize labels, choose the first day of the week and define your own weekends and holidays.
- **Week numbers.** Display week numbers and respond to clicks on a week or weekday.
- **Light, dark or your own.** Follow the system theme, match your app's theme switcher or bring a custom theme.
- **Your design.** Customize colors with CSS variables, replace classes and rearrange the calendar's HTML layout.
- **Touch and motion.** Swipe between months, animate navigation and collapse to a week, with reduced-motion preferences respected.
- **Accessible interaction.** Keyboard navigation, screen-reader labels and managed focus come built in.
- **Inline or in an input.** Embed a calendar in the page or open it beside a field. Shadow DOM is supported for Web Components.
- **Independent instances.** Put several calendars on one page, each with its own settings and selection.
- **Context for every date.** Add date popups, range annotations and selection tooltips for events, availability or other details.

[Explore the interactive examples →](https://vanilla-calendar.pro/docs/learn)

## Get started

```sh
npm install vanilla-calendar-pro
# or: pnpm add vanilla-calendar-pro
```

```html
<div id="calendar"></div>
```

```js
import { Calendar } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/core.css';

new Calendar('#calendar', {
  selectionDatesMode: 'multiple-ranged',
}).init();
```

To open the calendar from an input, use the same imports with `inputMode: true`:

```html
<input type="text" id="calendar-input" aria-label="Choose a date">
```

```js
new Calendar('#calendar-input', { inputMode: true }).init();
```

### Add the features you need

For example, add a time picker and swipe navigation to the same calendar:

```js
import { Calendar, motion, time } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/core.css';
import 'vanilla-calendar-pro/styles/motion.css';
import 'vanilla-calendar-pro/styles/time.css';

new Calendar('#calendar', {
  extensions: [motion, time],
  animation: true,
  enableSwipe: true,
  selectionTimeMode: 24,
}).init();
```

Also available: **`annotations`** for date popups and range tooltips, **`weeks`** for week features, and **`months`** for multiple-month calendars. [See all extensions →](https://vanilla-calendar.pro/docs/learn/installation-and-usage#extensions)

**Upgrading?** Existing options stay the same; ESM applications now need to import and register the extensions they use. Existing full CSS imports still work. [Migration details →](https://vanilla-calendar.pro/docs/reference/settings#extensions)

Prefer a script tag? [Use the CDN or download the complete package →](https://vanilla-calendar.pro/docs/learn/installation-and-usage#local-or-cdn)

## Make it look like your app

Use the built-in light and dark themes, let the calendar follow your app's theme, or create your own with CSS variables and custom layouts.

- **A simple start:** `styles/core.css` includes the core layout and both light/dark themes.
- **Just the features you use:** add matching styles such as `styles/time.css` or `styles/weeks.css`.
- **Complete styling:** `styles/index.css` includes every feature and both themes.
- **Full control:** import layout and theme parts separately to keep only your chosen theme.

[Themes and customization →](https://vanilla-calendar.pro/docs/learn/additional-features-themes) · [Styles reference →](https://vanilla-calendar.pro/docs/reference/styles)

## Browser support

Chrome 57+ · Firefox 52+ · Edge 80+ · Opera 44+ · Safari 10.1+. Date handling is tested across timezones and daylight-saving changes.

## Support the project

This project is tested with BrowserStack.

Free and open source. If Vanilla Calendar Pro saves you time, a star or a coffee helps keep it growing.

<a href="https://buymeacoffee.com/uvarov"><img src="https://raw.githubusercontent.com/uvarov-frontend/vanilla-calendar-pro/main/.github/assets/buy-me-a-coffee.svg" alt="Buy me a coffee" width="180" height="51"></a>

Found a bug or have an idea? [Open an issue](https://github.com/uvarov-frontend/vanilla-calendar-pro/issues).

---

[MIT License](https://github.com/uvarov-frontend/vanilla-calendar-pro/blob/main/LICENSE) · Made by [Yury Uvarov](https://github.com/uvarov-frontend).
