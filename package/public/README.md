# Vanilla Calendar Pro - Lightweight and Functional JavaScript Plugin for Date and Time Selection

[![vanilla-calendar preview](https://vanilla-calendar.pro/vanilla-calendar-preview-v3.png?v1)](https://vanilla-calendar.pro)

[![version](https://img.shields.io/npm/v/vanilla-calendar-pro.svg)](https://npmjs.com/package/vanilla-calendar-pro)
[![tests](https://github.com/uvarov-frontend/vanilla-calendar/actions/workflows/pull_request.yml/badge.svg)](https://github.com/uvarov-frontend/vanilla-calendar/actions/workflows/pull_request.yml)
[![downloads](https://img.shields.io/npm/dm/vanilla-calendar-pro.svg)](https://npmjs.com/package/vanilla-calendar-pro)

This is a versatile JavaScript date and time picker component with TypeScript support, compatible with any JavaScript frameworks and libraries. It is designed to be lightweight, easy to use, and feature-rich, without relying on external dependencies.

## Key Features

- **Lightweight**: The final JavaScript file is minified and optimized for fast loading.
-  **No Dependencies**: Completely self-contained, ensuring you don't need to include additional libraries.
- **Simple Localization**: Supports simple localization for any language.
- **Customizable**: Can be easily configured using CSS and HTML markup.
- **Multiple Instances**: Allows for an unlimited number of calendar instances on a single page.
- **Theme Support**: Supports automatic theme switching between light and dark modes, as well as custom user-defined themes.
- **Week Start Customization**: Supports any day of the week as the starting day.
- **Custom Weekends**: Define custom weekend days for each week as needed.
- **Week Number Display**: Can display week numbers throughout the year.
- **Not Tied to Input Tags**: Unlike many date pickers, it's not limited to the `<input>` tag.
- **Accessible**: Includes ARIA labels, `tabindex`, and full keyboard navigation, enhancing accessibility.
- **Date and Time Range Selection**: Supports selecting ranges for both dates and times, with maximum and minimum limits.
- **Popups and Tooltips**: Allows setting custom popups with user-defined information, and in date range selection mode, provides tooltips on hover.

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

You can install it using `npm` or `yarn`:

```sh
npm install vanilla-calendar-pro
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
- The `themes/light.min.css` theme provides a light color scheme.
- The `themes/dark.min.css` theme offers a dark color scheme.
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
      <div class="vc-header" data-vc="header" role="toolbar" aria-label="Calendar Navigation">
        <#ArrowPrev [month] />
        <div class="vc-header__content" data-vc-header="content">
          <#Month />
          <#Year />
        </div>
        <#ArrowNext [month] />
      </div>
      <div class="vc-wrapper" data-vc="wrapper">
        <#WeekNumbers />
        <div class="vc-content" data-vc="content">
          <#Week />
          <#Dates />
          <#DateRangeTooltip />
        </div>
      </div>
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

## License

MIT License

## Author

Yury Uvarov (*uvarov.frontend@gmail.com*)
