import VanillaCalendar from '@src/vanilla-calendar';
import messages from '@scripts/helpers/getMessages';

const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.substring(1, str.length)}`.replace(/\./, '');

const getLocaleWeekday = (self: VanillaCalendar, i: number) => {
	const weekday = new Date(`1978-01-0${i + 1}T00:00:00.000Z`).toLocaleString(self.settings.lang, { weekday: 'short', timeZone: 'UTC' });
	(self.locale.weekday as string[]).push(capitalizeFirstLetter(weekday));
};

const getLocaleMonth = (self: VanillaCalendar, i: number) => {
	const month = new Date(`1978-${i + 1 <= 9 ? `0${i + 1}` : i + 1}-01T00:00:00.000Z`).toLocaleString(self.settings.lang, { month: 'long', timeZone: 'UTC' });
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
