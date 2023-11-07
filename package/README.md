# Vanilla Calendar - A Lightweight, Feature-Rich JavaScript Date and Time Picker

[![vanilla-calendar preview](https://vanilla-calendar.com/vanilla-calendar-preview.png)](https://vanilla-calendar.com/)

[![package-badge]][package]

Vanilla Calendar is a versatile JavaScript date and time picker with TypeScript support, making it compatible with any JavaScript framework or library. It is designed to be lightweight, simple to use, and feature-rich without relying on external dependencies.

## Key Features

- **Lightweight**: The final minified .js file is only approximately **44.4 KB**, and with gzip compression, it's just around **10.8 KB**.
- **No Dependencies**: Vanilla Calendar is entirely self-contained, ensuring you don't need to include additional libraries.
- **Simple Localization**: Supports simple localization for any language.
- **Customizable**: Can be easily configured using CSS and HTML markup.
- **Multiple Instances**: Allows for an unlimited number of calendar instances on a single page.
- **Theme Support**: Includes two themes - the light theme and the dark theme.
- **Week Start Customization**: Supports both Sunday and Monday as the beginning of the week.
- **Week Number Display**: Can display week numbers throughout the year.
- **Not Tied to Input Tags**: Unlike many date pickers, it's not limited to the `<input>` tag.

## Browser Support

Vanilla Calendar is compatible with a wide range of browsers:

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
57+ ✔ | 52+ ✔ | 80+ ✔ | 44+ ✔ | 10.1+ ✔ |

## Support and Feedback

This plugin is completely free, and your support is important. Please feel free to report any issues or share your new ideas; it's really important!

If you like Vanilla Calendar, please consider giving it a 🌟 star on GitHub.

## Getting Started

### Installation

You can install Vanilla Calendar using npm or yarn:

```sh
npm install @uvarov.frontend/vanilla-calendar
# or
yarn add @uvarov.frontend/vanilla-calendar
```

If you prefer not to use a package manager, you can also include it via [CDN](https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar/build/) or [download](https://vanilla-calendar.com/vanilla-calendar.zip) it from the website.

### Usage

Here's a simple example of how to use Vanilla Calendar in your HTML:

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
// Import Vanilla Calendar
import Vanilla Calendar from '@uvarov.frontend/vanilla-calendar';

// Import the basic styles
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

// Import additional styles
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

// Initialize the calendar
const calendar = new Vanilla Calendar('#calendar');
calendar.init();
// or
// const calendarWithInput = new VanillaCalendar('#calendar-input', { input: true });
// calendarWithInput.init();
```

If you're not using a package manager and prefer manual installation or CDN usage, you can include the necessary files in your HTML document's `<head>`:

```html
<html>
  <head>
    <!-- Plugin CSS -->
    <link href="./vanilla-calendar.min.css" rel="stylesheet">
    <link href="./themes/light.min.css" rel="stylesheet">
    <link href="./themes/dark.min.css" rel="stylesheet">
    <!-- Plugin JS -->
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

Vanilla Calendar includes two CSS themes: the **light theme** and the **dark theme**.

- The **vanilla-calendar.min.css** file contains the essential structural styles for the calendar.
- The **light.min.css** theme provides a light color scheme.
- The **dark.min.css** theme offers a dark color scheme.

The calendar will automatically display the theme based on the user's system preferences. If you want to enforce a specific theme, you can do so manually without the need to import all themes separately.

## DOM Templates

Vanilla Calendar features customizable DOM templates that allow you to modify the structure of the calendar to fit your needs. The templates are identified by tags containing the **#** character, and they should include a trailing slash at the end.

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

For detailed instructions on using Vanilla Calendar in a React component with TypeScript, please visit the [website](https://vanilla-calendar.com/docs/learn/additional-features/react-component) for comprehensive documentation and examples.

## API Reference

For detailed information on the available parameters and settings, please refer to the [API reference](https://vanilla-calendar.com/docs/reference/).

## Sponsor

This project is tested with BrowserStack.

## License

MIT License

## Author

Yury Uvarov (*uvarov.frontend@gmail.com*)

[package]: https://www.npmjs.com/package/@uvarov.frontend/vanilla-calendar
[package-badge]: https://img.shields.io/npm/v/@uvarov.frontend/vanilla-calendar
