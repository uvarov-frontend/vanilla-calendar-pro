const errorMessages = {
  notFoundSelector: (selector: HTMLElement | string) =>
    `${selector} is not found, check the first argument passed to new Calendar. If the element lives inside a Shadow DOM, a string selector can't reach it - resolve the element yourself (e.g. shadowRoot.querySelector(...)) and pass it directly instead.`,
  notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.',
  alreadyInit: 'The calendar has already been initialized, calling init() again is not allowed. Create a new Calendar instance instead.',
  alreadyDestroyed: 'The calendar has already been destroyed, calling destroy() again is not allowed.',
  notLocale: 'You specified an incorrect language label or did not specify the required number of values ​​for «locale.weekdays» or «locale.months».',
  incorrectTime: 'The value of the time property can be: false, 12 or 24.',
  incorrectMonthsCount:
    'For the «multiple» calendar type, the «displayMonthsCount» parameter can have a value from 2 to 12, and for all others it cannot be greater than 1.',
  incorrectCollapseType: 'The «enableCollapse» parameter is only supported by the «default» and «week» calendar types.',
};

export default errorMessages;
