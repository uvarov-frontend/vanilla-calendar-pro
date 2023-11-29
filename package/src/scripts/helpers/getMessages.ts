const messages = {
	notFoundSelector: (selector: HTMLElement | string) => `${selector} is not found, check the first argument passed to new VanillaCalendar.`,
	notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.',
	notLocale: 'You specified "define" for "settings.lang" but did not provide the required values for "locale.weekday" or "locale.months".',
	incorrectTheme: 'Incorrect name of theme in "settings.visibility.theme".',
	incorrectTime: 'The value of the time property can be: false, true, 12 or 24.',
};

export default messages;
