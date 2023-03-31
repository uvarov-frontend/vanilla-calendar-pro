[![vanilla-calendar preview](https://vanilla-calendar.frontend.uvarov.tech/vanilla-calendar.jpg)](https://vanilla-calendar.frontend.uvarov.tech/)
# Lightweight, simple, feature-rich and no dependencies.

[![package-badge]][package]

VanillaCalendar is a pure JavaScript date and time picker using TypeScript so it supports any JS framework and library.

The final minified .js file is ~ **37.5 KB** and with gzip is ~ **9.2** KB.

Latest version without TypeScript - [v1.5.5](https://www.npmjs.com/package/@uvarov.frontend/vanilla-calendar/v/1.5.5)

This plugin is completely free, any support from you is important. Please report problems or new ideas, it's really important!

If you like the plugin, please give it an asterisk in the GitHub repository.

[API](https://vanilla-calendar.frontend.uvarov.tech/api/) | [Examples](https://vanilla-calendar.frontend.uvarov.tech/examples/)

## Getting Started

This calendar has no dependencies, has a simple localization for any language, is displayed anywhere, is not tied to the **«input»** tag, can have an unlimited number of copies on the page and is easily configurable both using CSS and by changing the html markup.

You can include it as a separate script in your html document or import it into your bundler.

### Install

You can get it via npm or yarn:

```sh
npm install @uvarov.frontend/vanilla-calendar
```

```sh
yarn add @uvarov.frontend/vanilla-calendar
```

If you are not working with a package manager, just [download](https://vanilla-calendar.frontend.uvarov.tech/vanilla-calendar.zip) manually, or connect via [CDN](https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar/build/).

### Usage

Simple usage example:

```js
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const calendar = new VanillaCalendar('#calendar');
calendar.init();
```

```html
<html>
  <head>
  </head>
  <body>
    <div id="calendar"></div>
  </body>
</html>
```

The **vanilla-calendar.min.css** file contains the properties of the calendar skeleton, other css files in the **themes** directory contain only the calendar color scheme.
The calendar automatically displays the theme used in the user's system. You can disable this default behavior and install any of the themes forcibly. In this case, you don't need to import all the themes.

---

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
Since the final plugin file is pure JavaScript without any dependencies, if desired, it can be used with any framework or library, such as Vue, React, Angular, etc.

**Example using React + TypeScript:**

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

**Markup template change available since v2.2.0**

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

## API

You can see all the parameters and settings of the calendar in the [extended documentation](https://vanilla-calendar.frontend.uvarov.tech/api/).

## License

MIT License

## Author

Yury Uvarov (*uvarov.frontend@gmail.com*)

[package]: https://www.npmjs.com/package/@uvarov.frontend/vanilla-calendar
[package-badge]: https://img.shields.io/npm/v/@uvarov.frontend/vanilla-calendar
