[![vanilla-calendar preview](https://vanilla-calendar.frontend.uvarov.tech/screenshot.png)](https://vanilla-calendar.frontend.uvarov.tech/)
# Vanilla JS Calendar

[![package-badge]][package]

A simple but feature rich calendar without dependencies and «input» tag. A lightweight date and time picker written in pure JavaScript with using TypeScript.

The size of the minified file .js is approximately **29.7kb** and **7.2kb** gzip.

[API](https://vanilla-calendar.frontend.uvarov.tech/api/) | [Examples](https://vanilla-calendar.frontend.uvarov.tech/examples/)

This plugin is completely free, any support from you is important, please report problems or new ideas, it's really important!

If you like the plugin please give it a star.

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

## Getting Started

This calendar has no dependencies, but has simple localization for any language, displays anywhere, is not tied to the **«input»** tag, can have an unlimited number of copies per page and is easily customizable both with CSS and by changing the html markup.

It is possible to include it as a standalone HTML script or import it into your bundler.

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

If you downloaded the files manually or decided to use a CDN, then instead of the example above, you need to add all the necessary files to the **head** tag of your HTML document. Here is an example of such usage:

```html
<html>
  <head>
    <!-- Plugin CSS -->
    <link href="./vanilla-calendar.min.css" rel="stylesheet">
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
Because the calendar is written in JavaScript with no dependencies, if desired, it can be used with any framework or library, such as Vue, React, Angular, etc.

**Example using React + TypeScript:**

```tsx
import { useEffect, useRef } from 'react';
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

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

`new VanillaCalendar()` — creates an instance of an object.

If you loaded the plugin from a &#60;script&#62; tag, the VanillaCalendar object is available on the global Window.

You can see all the parameters and settings of the calendar in the [extended documentation](https://vanilla-calendar.frontend.uvarov.tech/api/).

## License

MIT License

## Author

Yury Uvarov (*uvarov.frontend@gmail.com*)

[package]: https://www.npmjs.com/package/@uvarov.frontend/vanilla-calendar
[package-badge]: https://img.shields.io/npm/v/@uvarov.frontend/vanilla-calendar
[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg
[buymeacoffee]: https://www.buymeacoffee.com/uvarov
