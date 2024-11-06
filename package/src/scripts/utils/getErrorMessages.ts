const errorMessages = {
  notFoundSelector: (selector: HTMLElement | string) => `${selector} is not found, check the first argument passed to new Calendar.`,
  notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.',
  notLocale: 'You specified an incorrect language label or did not specify the required number of values ​​for «locale.weekdays» or «locale.months».',
  incorrectTime: 'The value of the time property can be: false, 12 or 24.',
  incorrectMonthsCount:
    'For the «multiple» calendar type, the «displayMonthsCount» parameter can have a value from 2 to 12, and for all others it cannot be greater than 1.',
};

export default errorMessages;
