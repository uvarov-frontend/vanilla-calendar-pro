[![vanilla-calendar preview](https://vanilla-calendar.frontend.uvarov.tech/preview.png?v2)](https://vanilla-calendar.frontend.uvarov.tech/)
# Vanilla JS Calendar v1.5.5

A simple yet feature rich calendar with no dependencies and no «input» tag. A lightweight date and time picker written in pure JavaScript.
The size of the minified file .js is approximately **30kb** and **7.2kb** gzip.

[Documentation](https://vanilla-calendar.frontend.uvarov.tech/en/documentation/) | [Demos](https://vanilla-calendar.frontend.uvarov.tech/en/demos/)

This plugin is completely free, any support from you is important, please report problems or new ideas, it's really important!

If you like the plugin please give it a star.

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

## Implementation

Because Vanilla Calendar is written in pure JavaScript, it can be used with any framework or library, such as Vue, React, or Angular, if desired. You can get the plugin by [downloading](https://vanilla-calendar.frontend.uvarov.tech/vanilla-calendar-v1.5.5.zip) it manually, via [cdn](https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar@1.5.5/build/) or via a package manager like npm:

```sh
npm install @uvarov.frontend/vanilla-calendar
```

Then import it in your javascript file.

```js
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
```

And don't forget to import the base plugin styles in your stylesheet:

```css
@import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
```

If you have downloaded the plugin or are using it via cdn, you need to embed the plugin in your page, you should include
all required files in the **head** tag of your HTML document:

```html

<html>
<head>
  <!-- Plugin CSS -->
  <link href="./vanilla-calendar.min.css" rel="stylesheet">
  <!-- Plugin JS -->
  <script src="./vanilla-calendar.min.js" defer></script>
</head>
<body>
</body>
</html>
```

## Initialization

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

Yuri Uvarov (*uvarov.frontend@gmail.com*)

[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg
[buymeacoffee]: https://www.buymeacoffee.com/uvarov
