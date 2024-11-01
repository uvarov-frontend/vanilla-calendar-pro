# VanillaCalendar - A Lightweight, Feature-Rich JavaScript Date and Time Picker

[![vanilla-calendar preview](https://vanilla-calendar.pro/vanilla-calendar-preview.png)](https://vanilla-calendar.pro/)

[![version](https://img.shields.io/npm/v/vanilla-calendar-pro.svg)](https://npmjs.com/package/vanilla-calendar-pro)
[![tests](https://github.com/uvarov-frontend/vanilla-calendar/actions/workflows/pull_request.yml/badge.svg)](https://github.com/uvarov-frontend/vanilla-calendar/actions/workflows/pull_request.yml)
[![downloads](https://img.shields.io/npm/dm/vanilla-calendar-pro.svg)](https://npmjs.com/package/vanilla-calendar-pro)

VanillaCalendar is a versatile JavaScript date and time picker with TypeScript support, making it compatible with any JavaScript framework or library. It is designed to be lightweight, simple to use, and feature-rich without relying on external dependencies.

## Key Features

- **Lightweight**: The final minified .js file is only approximately **37.3 KB**, and with gzip compression, it's just around **9.9 KB**.
- **No Dependencies**: VanillaCalendar is entirely self-contained, ensuring you don't need to include additional libraries.
- **Simple Localization**: Supports simple localization for any language.
- **Customizable**: Can be easily configured using CSS and HTML markup.
- **Multiple Instances**: Allows for an unlimited number of calendar instances on a single page.
- **Theme Support**: Includes two themes - the light theme and the dark theme.
- **Week Start Customization**: Supports both Sunday and Monday as the beginning of the week.
- **Week Number Display**: Can display week numbers throughout the year.
- **Not Tied to Input Tags**: Unlike many date pickers, it's not limited to the `<input>` tag.

## Browser Support

VanillaCalendar is compatible with a wide range of browsers:

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
57+ ✔ | 52+ ✔ | 80+ ✔ | 44+ ✔ | 10.1+ ✔ |

## Support and Feedback

This plugin is completely free, and your support is important. Please feel free to report any issues or share your new ideas; it's really important!

If you like VanillaCalendar, please consider giving it a 🌟 star on GitHub.

## Getting Started

### Installation

You can install VanillaCalendar using npm or yarn:

```sh
npm install vanilla-calendar-pro
# or
yarn add vanilla-calendar-pro
```

If you prefer not to use a package manager, you can also include it via [CDN](https://cdn.jsdelivr.net/npm/vanilla-calendar-pro/build/) or [download](https://vanilla-calendar.pro/vanilla-calendar.zip) it from the website.

### Usage

Here's a simple example of how to use VanillaCalendar in your HTML:

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
import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

// Initialize the calendar
const calendar = new VanillaCalendar('#calendar');
calendar.init();
// or
// const calendarWithInput = new VanillaCalendar('#calendar-input', { input: true });
// calendarWithInput.init();
```

If you're not using a package manager and prefer manual installation or CDN usage, you can include the necessary files in your HTML document's `<head>`:

```html
<html>
  <head>
    <link href="./vanilla-calendar.min.css" rel="stylesheet">
    <script src="./vanilla-calendar.min.js" defer></script>
  </head>
  <body>
    <div id="calendar"></div>

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const calendar = new VanillaCalendar('#calendar');
        calendar.init();
      });
    </script>
  </body>
</html>
```

## CSS Themes

```js
// Only layout calendar
import 'vanilla-calendar-pro/build/vanilla-calendar.layout.min.css';

// Themes
import 'vanilla-calendar-pro/build/themes/light.min.css';
import 'vanilla-calendar-pro/build/themes/dark.min.css';
```

VanillaCalendar includes two CSS themes: the **light theme** and the **dark theme**.

- The **vanilla-calendar.min.css** file contains all styles with all themes.
- The **vanilla-calendar.layout.min.css** file contains the essential structural styles for the calendar.
- The **themes/light.min.css** theme provides a light color scheme.
- The **themes/dark.min.css** theme offers a dark color scheme.


The calendar will automatically display the theme according to the user's system preferences. If you want to apply a specific theme, it is recommended to import **«vanilla-calendar.layout.min.css»** along with the theme you prefer: **«light.min.css»** or **«dark.min.css»**, instead of **«vanilla-calendar.min.css»**.

## DOM Templates

VanillaCalendar features customizable DOM templates that allow you to modify the structure of the calendar to fit your needs. The templates are identified by tags containing the **#** character, and they should include a trailing slash at the end.

Here's an example of the default template:

```js
new VanillaCalendar('#calendar', {
  DOMTemplates: {
    default: `
      <div class="vanilla-calendar-header">
        <#ArrowPrev />
        <div class="vanilla-calendar-header__content">
          <#Month />
          <#Year />
        </div>
        <#ArrowNext />
      </div>
      <div class="vanilla-calendar-wrapper">
        <#WeekNumbers />
        <div class "vanilla-calendar-content">
          <#Week />
          <#Days />
        </div>
      </div>
      <#ControlTime />
    `
  }
});
```

## React Component

For detailed instructions on using VanillaCalendar in a React component with TypeScript, please visit the [website](https://vanilla-calendar.pro/docs/learn/additional-features/react-component) for comprehensive documentation and examples.

## API Reference

For detailed information on the available parameters and settings, please refer to the [API reference](https://vanilla-calendar.pro/docs/reference/main/create-an-instance).

## Sponsor

This project is tested with BrowserStack.

## License

MIT License

## Author

Yury Uvarov (*uvarov.frontend@gmail.com*)
