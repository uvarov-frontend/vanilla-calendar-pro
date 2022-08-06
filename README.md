[![vanilla-calendar preview](https://vanilla-calendar.frontend.uvarov.tech/preview.png?v2)](https://vanilla-calendar.frontend.uvarov.tech/)
# Vanilla JS Calendar v1.5.2

A simple yet feature rich calendar with no dependencies and no «input» tag. A lightweight date and time picker written in pure JavaScript.
The size of the minified file .js is approximately **30.4kb** and **7.3kb** gzip.

[DEMO](https://vanilla-calendar.frontend.uvarov.tech/)

This plugin is completely free, any support from you is important, please report problems or new ideas, it's really important!

If you like the plugin please give it a star.

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

## Implementation

Because Vanilla Calendar is written in pure JavaScript, it can be used with any framework or library, such as Vue, React, or Angular, if desired. You can get the plugin by [downloading](https://vanilla-calendar.frontend.uvarov.tech/vanilla-calendar-v1.5.2.zip) it manually, via [cdn](https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar@1.5.2/) or via a package manager like npm:

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

## Documentation

The first argument can be either an HTML element selector or the element itself. The second optional argument can be passed options that define the calendar settings.

```js
new VanillaCalendar(selector || object[, options]);
```

### Main parameters

| Name       |    Type     |   Default    | Description                                                                                                                       |
|------------|:-----------:|:------------:|-----------------------------------------------------------------------------------------------------------------------------------|
| type       |   String    |  'default'   | Calendar type. Possible options: 'default', 'month', 'year'.                                                                      |
| date.min   |   String    | '1970-01-01' | The minimum possible date that the calendar will take into account in its life cycle. Note the required date format 'YYYY-MM-DD'. |
| date.max   |   String    | '2470-12-31' | The maximum possible date that the calendar will consider in its life cycle. Note the required date format 'YYYY-MM-DD'.          |
| date.today | Date object |  new Date()  | Specifies which day the calendar will consider today. For example: «new Date('2022-01-07')».                                      |

### Settings

| Name                               |      Type       | Default  | Description                                                                                                                                                                                 |
|------------------------------------|:---------------:|:--------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| settings.lang                      |     String      |   'en'   | Language localization of the calendar. Specify a BCP 47 locale or «'define'» to assign your own month and week names, see demo for details.                                                 |
| settings.iso8601                   |     Boolean     |   true   | Weeks in ISO 8601 format. If set to «false», the week starts on Sunday.                                                                                                                     |
| settings.range.min                 |     String      |   null   | Specifies the minimum possible date for the user to select. Dates below this will be considered disabled and unselectable. Note the required date format 'YYYY-MM-DD'.                      |
| settings.range.max                 |     String      |   null   | Specifies the maximum possible date for the user to select. Dates below this will be considered disabled and unselectable. Note the required date format 'YYYY-MM-DD'.                      |
| settings.range.disabled            |      Array      |   null   | Disable specified dates despite date range. Note the required date format 'YYYY-MM-DD'.                                                                                                     |
| settings.range.enabled             |      Array      |   null   | Include only the specified dates, regardless of the date range. 'settings.range.disabled' must be null. Note the required date format 'YYYY-MM-DD'.                                         |
| settings.selection.day             |     String      | 'single' | Allow selection of one or more days. Possible options: «false», «'single'», «'multiple'», «'multiple-ranged'».                                                                              |
| settings.selection.month           |     Boolean     |   true   | Allow month selection. Yes or no.                                                                                                                                                           |
| settings.selection.year            |     Boolean     |   true   | Allow year selection. Yes or no.                                                                                                                                                            |
| settings.selection.time            | Boolean, Number |  false   | Enable time picker. Possible options: "false" - turn off, "true" - 12-hour day, "12" - 12-hour day, "24" - 24-hour day.                                                                     |
| settings.selection.controlTime     |     String      |  'all'   | The way of choosing the time. Possible options: "'all'" - everything, "'range'" - only the controller.                                                                                      |
| settings.selection.stepHours       |     Number      |    1     | Clock controller step.                                                                                                                                                                      |
| settings.selection.stepMinutes     |     Number      |    1     | Minute controller step.                                                                                                                                                                     |
| settings.selected.dates            |      Array      |   null   | List of days marked as selected when the calendar was initialized. Note the required date format 'YYYY-MM-DD'.                                                                              |
| settings.selected.month            |     Number      |   null   | The month to display when the calendar is initialized. From 0 to 11.                                                                                                                        |
| settings.selected.year             |     Number      |   null   | The year displayed when the calendar is initialized. Note the required date format 'YYYY'.                                                                                                  |
| settings.selected.holidays         |      Array      |   null   | The specified days will be considered additional days off. Note the required date format 'YYYY-MM-DD'.                                                                                      |
| settings.selected.time             |     String      |   null   | The time displayed when the calendar is initialized. Note the required time format 'hh:mm aa'. 'aa' is the AM/PM marker. If a 24-hour day is specified, 'aa' does not need to be specified. |
| settings.visibility.templateHeader |     String      | '%M %Y'  | Customize the title of the calendar. %M - month display pattern, %Y - year display pattern.                                                                                                 |
| settings.visibility.monthShort     |     Boolean     |   true   | Abbreviated names of months in the month selection.                                                                                                                                         |
| settings.visibility.weekNumbers    |     Boolean     |  false   | Show week numbers of the year.                                                                                                                                                              |
| settings.visibility.weekend        |     Boolean     |   true   | Highlight the weekend.                                                                                                                                                                      |
| settings.visibility.today          |     Boolean     |   true   | Highlight the today.                                                                                                                                                                        |
| settings.visibility.disabled       |     Boolean     |  false   | Show all days, including disabled ones.                                                                                                                                                     |

### Locale

| Name           | Type  | Default | Description                                                                                                                                       |
|----------------|:-----:|:-------:|---------------------------------------------------------------------------------------------------------------------------------------------------|
| locale.months  | Array |  null   | An array with custom month names. January must be the first element in the array. Only works when «settings.lang» is set to «'define'».           |
| locale.weekday | Array |  null   | An array with custom abbreviated week names. Sunday must be the first element in the array. Only works when «settings.lang» is set to «'define'». |

### Methods

| Name                 |   Type   | Default | Description                                                                                                       |
|----------------------|:--------:|:-------:|-------------------------------------------------------------------------------------------------------------------|
| actions.clickDay()   | Function |  null   | The method fires after clicking on a day in the calendar before it is visually displayed. Parameters: (d, dates). |
| actions.clickMonth() | Function |  null   | The method is triggered after selecting a month in the calendar, before visual display. Parameters: (e, month).   |
| actions.clickYear()  | Function |  null   | The method is triggered after selecting a year in the calendar, before visual display. Parameters: (d, year).     |
| actions.changeTime() | Function |  null   | The method is triggered after any time change. Parameters: (e, time, hours, minutes, keeping).                    |

### Popups

| Name                  |  Type  | Default | Description                                                                                                                                          |
|-----------------------|:------:|:-------:|------------------------------------------------------------------------------------------------------------------------------------------------------|
| popups[date]          | String |  null   | The «popups» object accepts a date as an object key, such as «popups['2022-06-29']». Note the required date format 'YYYY-MM-DD'.                     |
| popups[date].modifier | String |  null   | The «popups[date].modifier» object takes a CSS class as its value. This class allows you to highlight the date using styles.                         |
| popups[date].html     | String |  null   | The «popups[date].html» object takes as its value a string that is rendered to HTML. You can pass plain text or full HTML markup to style the popup. |

## Usage example
### Simplest
```js
const calendar = new VanillaCalendar('#calendar');
calendar.init();
```
### All parameters
```js
const calendar = new VanillaCalendar('.vanilla-calendar', {
  type: 'month',
  date: {
    min: '2000-01-01',
    max: '2030-12-31',
    today: new Date('2022-01-07'),
  },
  settings: {
    lang: 'define',
    iso8601: true,
    range: {
      min: '2022-01-01',
      max: '2022-02-12',
      disabled: null,
      enabled: ['2022-01-25'],
    },
    selection: {
      day: 'multiple',
      month: false,
      year: false,
      time: true,
      controlTime: 'range',
      stepHours: 5,
      stepMinutes: 5,
    },
    selected: {
      dates: ['2022-01-09', '2022-01-10'],
      month: 1,
      year: 2022,
      holidays: ['2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05'],
      time: '03:44 AM',
    },
    visibility: {
      templateHeader: '> %M | %Y <',
      monthShort: false,
      weekNumbers: true,
      weekend: false,
      today: true,
      disabled: true,
    },
  },
  locale: {
    months: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'],
    weekday: ['Си', 'Же', 'Ду', 'Сй', 'Ср', 'Бе', 'Жұ'],
    // Example:
    // months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    // Note that the weeks array must start with Sunday, this does not affect ISO 8601.
  },
  actions: {
    clickDay(e, dates) {
      alert(dates);
    },
    clickMonth(e, month) {
      alert(month);
    },
    clickYear(e, year) {
      alert(year);
    },
    changeTime(e, time, hours, minutes, keeping) {
      console.log(e, time, hours, minutes, keeping);
    },
  },
  popups: {
    '2022-06-28': {
      modifier: 'bg-red',
      html: 'Meeting at 9:00 PM',
    },
    '2022-07-13': {
      modifier: 'bg-red',
      html: 'Meeting at 6:00 PM',
    },
    '2022-07-17': {
      modifier: 'bg-orange',
      html: `<div>
        <u><b>12:00 PM</b></u>
        <p style="margin: 5px 0 0;">Airplane in Las Vegas</p>
      </div>`,
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

[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg
[buymeacoffee]: https://www.buymeacoffee.com/uvarov
