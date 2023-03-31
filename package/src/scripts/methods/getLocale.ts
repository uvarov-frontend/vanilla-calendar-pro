import { IVanillaCalendar } from 'src/types';

const getLocale = (self: IVanillaCalendar) => {
	if (self.settings.lang === 'define') return;

	self.locale.weekday = [];
	for (let i = 0; i < 7; i++) {
		let weekday = new Date(0, 0, i).toLocaleString(self.settings.lang, { weekday: 'short' });
		weekday = `${weekday.charAt(0).toUpperCase()}${weekday.substring(1, weekday.length)}`;
		weekday = weekday.replace(/\./, '');
		(self.locale.weekday as string[]).push(weekday);
	}

	self.locale.months = [];
	for (let i = 0; i < 12; i++) {
		let month = new Date(0, i).toLocaleString(self.settings.lang, { month: 'long' });
		month = `${month.charAt(0).toUpperCase()}${month.substring(1, month.length)}`;
		month = month.replace(/\./, '');
		(self.locale.months as string[]).push(month);
	}
};

export default getLocale;
