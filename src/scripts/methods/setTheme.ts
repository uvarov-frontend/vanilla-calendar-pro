import { IVanillaCalendar } from 'src/types';
import themes from '../themes';

const setTheme = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	if (self.settings.visibility.theme === 'system') {
		const dark = window.matchMedia('(prefers-color-scheme: dark)');
		self.HTMLElement.dataset.calendarTheme = dark.matches ? 'dark' : 'light';

		dark.addEventListener('change', (e) => {
			(self.HTMLElement as HTMLElement).dataset.calendarTheme = e.matches ? 'dark' : 'light';
		});
	} else {
		if (themes.includes(self.settings.visibility.theme)) {
			self.HTMLElement.dataset.calendarTheme = self.settings.visibility.theme;
			return;
		}
		// eslint-disable-next-line no-console
		console.error('Incorrect name of theme in settings.visibility.theme');
	}
};

export default setTheme;
