const errorMessages = {
  notFoundSelector: (selector: HTMLElement | string) => `${selector} is not found, check the first argument passed to new VanillaCalendar.`,
  notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.',
  notLocale: 'You specified an incorrect language label or did not specify the required number of values ​​for «locale.weekdays» or «locale.months».',
  incorrectTime: 'The value of the time property can be: false, 12 or 24.',
};

export default errorMessages;
