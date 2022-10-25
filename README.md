[![vanilla-calendar preview](https://vanilla-calendar.frontend.uvarov.tech/screenshot.png)](https://vanilla-calendar.frontend.uvarov.tech/)
# Vanilla JS Calendar v2.1.1

A simple yet feature rich calendar with no dependencies and no «input» tag. A lightweight date and time picker written in pure JavaScript using TypeScript.
The size of the minified file .js is approximately **27kb** and **6.4kb** gzip.

[Documentation](https://vanilla-calendar.frontend.uvarov.tech/en/documentation/) | [Demos](https://vanilla-calendar.frontend.uvarov.tech/en/demos/)

This plugin is completely free, any support from you is important, please report problems or new ideas, it's really important!

If you like the plugin please give it a star.

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

## Getting Started

Because Vanilla Calendar is written in pure JavaScript using TypeScript, it can be used with any framework or library you want, such as Vue, React, Angular, and more.

### Installation

You can get it via npm or yarn:

```sh
npm install @uvarov.frontend/vanilla-calendar
```

```sh
yarn add @uvarov.frontend/vanilla-calendar
```

If you are not working with a package manager, just [download](https://vanilla-calendar.frontend.uvarov.tech/vanilla-calendar-v2.1.1.zip) manually, or connect via [CDN](https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar@2.1.1/build/).

### Examples

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

React component:

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
  }, [calendarEl.current]);

  return (
    <div ref={calendarEl}
      className="vanilla-calendar"></div>
  );
};

export default Calendar;
```

## API

The first argument can be either the CSS selector of the HTML element, or the element itself. The second optional argument can be passed parameters that define the calendar settings.

```js
// CSS Selector
const calendar = new VanillaCalendar('#calendar', {
  // Options
});
calendar.init();
```

```js
// HTML element
const calendarEl = document.querySelector('#calendar');
const calendar = new VanillaCalendar(calendarEl, {
  // Options
});
calendar.init();
```

You can see all the parameters and settings of the calendar in the [extended documentation](https://vanilla-calendar.frontend.uvarov.tech/en/documentation/).

## License

MIT License

## Author

Yury Uvarov (*uvarov.frontend@gmail.com*)

[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg
[buymeacoffee]: https://www.buymeacoffee.com/uvarov
