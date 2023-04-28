import { IVanillaCalendar } from '../../types';
import themes from '../themes';

let haveListener = false;

const getActiveTheme = (htmlEl: HTMLElement, attr: string) => {
	let activeTheme: typeof themes[number] | null = null;

	for (let i = 0; i < themes.length; i++) {
		const theme = themes[i];
		if (theme === 'system') return;
		if (htmlEl.getAttribute(attr)?.includes(themes[i])) {
			activeTheme = themes[i];
			break;
		}
	}

	// eslint-disable-next-line consistent-return
	return activeTheme;
};

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

const track = (self: IVanillaCalendar, htmlEl: HTMLElement, attr: string) => {
	const changes = (mutationsList: MutationRecord[]) => {
		for (let i = 0; i < mutationsList.length; i++) {
			const record = mutationsList[i];
			if (record.attributeName === attr) {
				const activeTheme = getActiveTheme(htmlEl, attr);
				if (activeTheme) set(self, activeTheme);
				break;
			}
		}
	};

	const observer = new MutationObserver(changes);
	observer.observe(htmlEl, {
		attributes: true,
	});
};

const detect = (self: IVanillaCalendar, supportDarkTheme: MediaQueryList | undefined) => {
	if (!self.HTMLElement) return;

	const detectedThemeEl = self.settings.visibility.themeDetect ? document.querySelector(self.settings.visibility.themeDetect) : false;

	if (!detectedThemeEl) {
		get(self, supportDarkTheme);
		return;
	}

	const attr = (self.settings.visibility.themeDetect as string).replace(/^.*\[(.+)\]/g, (_, p1) => p1);
	const strValues = detectedThemeEl.hasAttribute(attr);

	if (!attr || !strValues) {
		get(self, supportDarkTheme);
		return;
	}

	const activeTheme = getActiveTheme(detectedThemeEl as HTMLElement, attr);

	if (activeTheme) {
		set(self, activeTheme);
		track(self, detectedThemeEl as HTMLElement, attr);
	} else {
		get(self, supportDarkTheme);
	}
};

const setTheme = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	let supportDarkTheme: MediaQueryList | undefined;

	if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
		supportDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
	}

	if (self.settings.visibility.theme === 'system') {
		detect(self, supportDarkTheme);
	} else {
		set(self, self.settings.visibility.theme);
	}
};

export default setTheme;
