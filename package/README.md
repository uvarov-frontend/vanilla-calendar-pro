[![vanilla-calendar preview](https://vanilla-calendar.com/vanilla-calendar-preview.png)](https://vanilla-calendar.com/)
# Lightweight, simple, feature-rich and no dependencies.

[![package-badge]][package]

VanillaCalendar is a pure JavaScript date and time picker using TypeScript so it supports any JS framework and library.

The final minified .js file is ~ **41.5 KB** and with gzip is ~ **10.2** KB.

Latest version without TypeScript - [v1.5.5](https://www.npmjs.com/package/@uvarov.frontend/vanilla-calendar/v/1.5.5) (**No longer supported**)

This plugin is completely free, any support from you is important. Please report problems or new ideas, it's really important!

If you like VanillaCalendar, please give it a 🌟 star on GitHub.

## Getting Started

This calendar has no dependencies, has a simple localization for any language, is displayed anywhere, is not tied to the **«input»** tag, can have an unlimited number of copies on the page and is easily configurable both using CSS and by changing the html markup.

You can include it as a separate script in your html document or import it into your bundler.

### Install

You can get it via npm or yarn:

```sh
npm install @uvarov.frontend/vanilla-calendar
# or
yarn add @uvarov.frontend/vanilla-calendar
```

If you are not using a package manager, connect locally or via [CDN](https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar/build/).

### Usage

Simple usage example:

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

The **vanilla-calendar.min.css** file contains the properties of the calendar skeleton, other css files in the **themes** directory contain only the calendar color scheme.
The calendar automatically displays the theme used in the user's system. You can disable this default behavior and install any of the themes forcibly. In this case, you don't need to import all the themes.

```js
// JS Script
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';

// Basic styles
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

// Additional styles
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const calendar = new VanillaCalendar('#calendar');
calendar.init();
// or
// const calendarWithInput = new VanillaCalendar('#calendar-input', { input: true });
// calendarWithInput.init();
```

If you downloaded the files manually or decided to use a CDN, then instead of the example above, you need to add all the necessary files to the **head** tag of your HTML document. Here is an example of such usage:

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

### DOM Templates

The calendar has registered components with which you can completely change the structure of the calendar.
Tags containing the **«#»** character are registered calendar components and must include a trailing slash at the end of the tag.
Default Template:

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
        <div class="vanilla-calendar-content">
          <#Week />
          <#Days />
        </div>
      </div>
      <#ControlTime />
    `
  }
});
```

### Example using React + TypeScript

Since the final plugin file is pure JavaScript without any dependencies, if desired, it can be used with any framework or library, such as Vue, React, Angular, etc.

```tsx
import { useEffect, useRef } from 'react';
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const Calendar: React.FC = () => {
  const calendarEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendarEl.current) return;

    const calendar = new VanillaCalendar(calendarEl.current, {
      settings: {
        lang: 'en',
        selection: {
          time: 12,
        },
      },
    });
    calendar.init();
  }, [calendarEl]);

  return (
    <div ref={calendarEl}></div>
  );
};

export default Calendar;
```

## API Reference

You can see all the parameters and settings of the calendar in the [reference](https://vanilla-calendar.com/docs/reference/).

## License

MIT License

## Author

Yury Uvarov (*uvarov.frontend@gmail.com*)

[package]: https://www.npmjs.com/package/@uvarov.frontend/vanilla-calendar
[package-badge]: https://img.shields.io/npm/v/@uvarov.frontend/vanilla-calendar
