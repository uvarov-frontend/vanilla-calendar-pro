const errorMessages = {
  notFoundSelector: (selector: HTMLElement | string) => `${selector} is not found, check the first argument passed to new VanillaCalendar.`,
  notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.',
  notLocale: 'You did not specify the required number of values ​​for «locale.weekday» or «locale.months»',
  incorrectTime: 'The value of the time property can be: false, 12 or 24.',
};

export default errorMessages;
