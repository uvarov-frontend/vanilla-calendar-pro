# Vanilla JS Calendar v1.4.3

A simple yet feature rich calendar with no dependencies and no «input» tag, written in vanilla JavaScript. The size of
the minified file .js is approximately **22kb** and **5.3kb** gzip.

[DEMO](https://vanilla-calendar.frontend.uvarov.tech/)

## Implementation

Since Vanilla Calendar is written in pure JavaScript, it can be used with any modern framework or library, be it Vue,
React or Angular. You can get the plugin
by [downloading](https://vanilla-calendar.frontend.uvarov.tech/vanilla-calendar-v1.4.3.zip) it manually,
via [cdn](https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar@1.4.3/) or via a package manager like npm:

```sh
npm install @uvarov.frontend/vanilla-calendar
```

Then import it in your javascript file.

```js
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
```

And don't forget to import the base plugin styles in your stylesheet:

```css
@import '@uvarov.frontend/vanilla-calendar/vanilla-calendar.min.css';
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

## Documentation

The element selector is passed as the first parameter, options as the second.

```js
new VanillaCalendar(selector, options);
```

### Main parameters

| Name                         |    Type     |   Default    | Description                                                                                                                                                      |
|------------------------------|:-----------:|:------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type                         |   String    |  'default'   | Calendar type. Possible options: 'default', 'month', 'year'.                                                                                                     |
| date.min                     |   String    | '1970-01-01' | The minimum possible date that the calendar will take into account.                                                                                              |
| date.max                     |   String    | '2470-12-31' | The maximum possible date that the calendar will take into account.                                                                                              |
| date.today                   | Date object |  new Date()  | Specifies which day the calendar will consider today.                                                                                                            |

### Settings

| Name                            |  Type   | Default  | Description                                                                                                                                                      |
|---------------------------------|:-------:|:--------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| settings.lang                   | String  |   'en'   | Indicates what language the labels will be in. The available default options are 'ru' and 'en'. It is also possible to install any other language, see the demo. |
| settings.iso8601                | Boolean |   true   | Weeks in ISO 8601 format.                                                                                                                                        |
| settings.range.min              | String  |   null   | Dates less than this will be considered disabled.                                                                                                                |
| settings.range.max              | String  |   null   | Dates greater than this will be considered disabled.                                                                                                             |
| settings.range.disabled         |  Array  |   null   | Force the specified dates to be disabled.                                                                                                                        |
| settings.selection.day          | String  | 'single' | Allow to choose a days. Possible options: 'single', 'multiple', 'multiple-ranged'.                                                                               |
| settings.selection.month        | Boolean |   true   | Allow to select a month.                                                                                                                                         |
| settings.selection.year         | Boolean |   true   | Allow to select a year.                                                                                                                                          |
| settings.selected.dates         |  Array  |   null   | List of days to be selected.                                                                                                                                     |
| settings.selected.month         | Number  |   null   | Selected month by default.                                                                                                                                       |
| settings.selected.year          | Number  |   null   | Selected year by default.                                                                                                                                        |
| settings.selected.holidays      |  Array  |   null   | The specified days will be considered additional days off.                                                                                                       |
| settings.visibility.weekend     | Boolean |   true   | Highlight the weekend.                                                                                                                                           |
| settings.visibility.today       | Boolean |   true   | Highlight the today.                                                                                                                                             |
| settings.visibility.disabled    | Boolean |  false   | Show disabled days.                                                                                                                                              |
| settings.visibility.weekNumbers | Boolean |  false   | Show week numbers.                                                                                                                                               |

### Methods

| Name                         |    Type     |   Default    | Description                                                                                                                                                      |
|------------------------------|:-----------:|:------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| actions.clickDay             |  Function   |     null     | The method is triggered after clicking on a day in the calendar, but before other operations.                                                                    |
| actions.clickMonth           |  Function   |     null     | The method is triggered after clicking on a month in the calendar, but before other operations.                                                                  |
| actions.clickYear            |  Function   |     null     | The method is triggered after clicking on a year in the calendar, but before other operations.                                                                   |

## Usage example

```js
const calendar = new VanillaCalendar('.vanilla-calendar', {
  type: 'month',
  date: {
    min: '2000-01-01',
    max: '2030-12-31',
    today: new Date('2022-01-07'),
  },
  settings: {
    lang: 'ru',
    iso8601: true,
    range: {
      min: '2022-01-01',
      max: '2022-02-12',
      disabled: ['2022-01-25'],
    },
    selection: {
      day: 'multiple',
      month: false,
      year: false,
    },
    selected: {
      dates: ['2022-01-09', '2022-01-10'],
      month: 1,
      year: 2022,
      holidays: ['2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05'],
    },
    visibility: {
      weekend: false,
      today: true,
      disabled: true,
      weekNumbers: true,
    },
  },
  actions: {
    clickDay(e) {
      alert(e.target.dataset.calendarDay);
    },
    clickMonth(e) {
      alert(e.target.dataset.calendarMonth);
    },
    clickYear(e) {
      alert(e.target.dataset.calendarYear);
    },
  },
});

calendar.init();
```

Change settings and update:

```js
calendar.date.today = new Date('2022-01-25');
calendar.settings.lang = 'en';
calendar.settings.iso8601 = false;
calendar.settings.selected.date = '2022-01-15';

calendar.update();
```

## License

MIT License

## Author

Yuri Uvarov (*uvarov.frontend@gmail.com*)
