import { IVanillaCalendar } from 'src/types';
import themes from '../themes';

let haveListener = false;

const set = (self: IVanillaCalendar, theme: typeof themes[number]) => {
	if (!self.HTMLElement) return;

	if (themes.includes(theme)) {
		self.HTMLElement.dataset.calendarTheme = theme;
		return;
	}
	// eslint-disable-next-line no-console
	console.error('Incorrect name of theme in settings.visibility.theme');
};

const get = (self: IVanillaCalendar, supportDarkTheme: MediaQueryList | undefined) => {
	if (!supportDarkTheme) {
		set(self, 'light');
		return;
	}

	const theme = (e: MediaQueryList | MediaQueryListEvent) => (e.matches ? 'dark' : 'light');
	(self.HTMLElement as HTMLElement).dataset.calendarTheme = theme(supportDarkTheme);

	if (!haveListener) {
		supportDarkTheme.addEventListener('change', (e) => {
			if (self.settings.visibility.theme !== 'system') return;
			(self.HTMLElement as HTMLElement).dataset.calendarTheme = theme(e);
		});
		haveListener = true;
	}
};

const setTheme = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	let supportDarkTheme: MediaQueryList | undefined;

	if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
		supportDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
	}

	if (self.settings.visibility.theme === 'system') {
		get(self, supportDarkTheme);
	} else {
		set(self, self.settings.visibility.theme);
	}
};

export default setTheme;
