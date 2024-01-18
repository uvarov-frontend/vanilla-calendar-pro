import VanillaCalendar from '@src/vanilla-calendar';
import messages from '@scripts/helpers/getMessages';

const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.substring(1, str.length)}`.replace(/\./, '');

const getLocaleWeekday = (self: VanillaCalendar, i: number) => {
	const weekday = new Date(Date.UTC(0, 0, i)).toLocaleString(self.settings.lang, { weekday: 'short' });
	(self.locale.weekday as string[]).push(capitalizeFirstLetter(weekday));
};

const getLocaleMonth = (self: VanillaCalendar, i: number) => {
	const month = new Date(Date.UTC(0, i)).toLocaleString(self.settings.lang, { month: 'long' });
	(self.locale.months as string[]).push(capitalizeFirstLetter(month));
};

const getLocale = (self: VanillaCalendar) => {
	if (self.settings.lang === 'define' && self.locale.weekday[6] && self.locale.months[11]) return;

	if (self.settings.lang === 'define') {
		throw new Error(messages.notLocale);
	}

	self.locale.weekday = [];
	self.locale.months = [];

	for (let i = 0; i < 7; i++) getLocaleWeekday(self, i);
	for (let i = 0; i < 12; i++) getLocaleMonth(self, i);
};

export default getLocale;
