const messages = {
  notFoundSelector: (selector: HTMLElement | string) => `${selector} is not found, check the first argument passed to new VanillaCalendar.`,
  notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.',
  notLocale: 'You did not specify the required number of values ​​for «locale.weekday» or «locale.months»',
  incorrectTime: 'The value of the time property can be: false, true, 12 or 24.',
  ariaLabels: {
    application: 'Calendar',
    navigation: 'Calendar Navigation',
    arrowNext: {
      month: 'Next month',
      year: 'Next list of years',
    },
    arrowPrev: {
      month: 'Previous month',
      year: 'Previous list of years',
    },
    month: 'Select month, current selected month:',
    months: 'List of months',
    year: 'Select year, current selected year:',
    years: 'List of years',
    week: 'Days of the week',
    weekNumber: 'Numbers of weeks in a year',
    dates: 'Dates in the current month',
    selectingTime: 'Selecting a time ',
    inputHour: 'Hours',
    inputMinute: 'Minutes',
    rangeHour: 'Slider for selecting hours',
    rangeMinute: 'Slider for selecting minutes',
    btnKeeping: 'Switch AM/PM, current position:',
  },
};

export default messages;
