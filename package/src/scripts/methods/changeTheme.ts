import VanillaCalendar from '@src/vanilla-calendar';

const themes = ['light', 'dark', 'system'];

const haveListener = {
	value: false,
	set: () => { haveListener.value = true; },
	check: () => haveListener.value,
};

const getTheme = (htmlEl: HTMLElement, attr: string) => themes.find((t) => t !== 'system' && htmlEl.getAttribute(attr)?.includes(t)) as 'dark' | 'light' | undefined;

const setTheme = (htmlEl: HTMLElement, theme: 'dark' | 'light'): void => { htmlEl.dataset.calendarTheme = theme; };

const trackChangesThemeInSystemSettings = (self: VanillaCalendar, supportDarkTheme: MediaQueryList) => {
	const setDataAttrTheme = (event: MediaQueryList | MediaQueryListEvent) => setTheme(self.HTMLElement, event.matches ? 'dark' : 'light');
	setDataAttrTheme(supportDarkTheme);

	if (self.settings.visibility.theme !== 'system' || haveListener.check()) return;

	supportDarkTheme.addEventListener('change', setDataAttrTheme);
	haveListener.set();
};

const trackChangesThemeInHTMLElement = (self: VanillaCalendar, htmlEl: HTMLElement, attr: string) => {
	const changes = (mutationsList: MutationRecord[]) => {
		for (let i = 0; i < mutationsList.length; i++) {
			const record = mutationsList[i];
			if (record.attributeName === attr) {
				const activeTheme = getTheme(htmlEl, attr);
				if (activeTheme) setTheme(self.HTMLElement, activeTheme);
				break;
			}
		}
	};

	const observer = new MutationObserver(changes);
	observer.observe(htmlEl, {
		attributes: true,
	});
};

const detectTheme = (self: VanillaCalendar, supportDarkTheme: MediaQueryList) => {
	const detectedThemeEl: HTMLElement | null = self.settings.visibility.themeDetect
		? document.querySelector(self.settings.visibility.themeDetect)
		: null;

	if (!detectedThemeEl) {
		trackChangesThemeInSystemSettings(self, supportDarkTheme);
	} else {
		const attr = (self.settings.visibility.themeDetect as string).replace(/^.*\[(.+)\]/g, (_, p1) => p1);
		const activeTheme = getTheme(detectedThemeEl, attr);

		if (activeTheme) {
			setTheme(self.HTMLElement, activeTheme);
			trackChangesThemeInHTMLElement(self, detectedThemeEl, attr);
		} else {
			trackChangesThemeInSystemSettings(self, supportDarkTheme);
		}
	}
};

const changeTheme = (self: VanillaCalendar) => {
	if (!themes.includes(self.settings.visibility.theme)) throw new Error('Incorrect name of theme in "settings.visibility.theme"');

	let supportDarkTheme: MediaQueryList;

	if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
		supportDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
	} else {
		setTheme(self.HTMLElement, 'light');
		return;
	}

	const mapThemes = {
		light: () => setTheme(self.HTMLElement, 'light'),
		dark: () => setTheme(self.HTMLElement, 'dark'),
		system: () => detectTheme(self, supportDarkTheme),
	};
	mapThemes[self.settings.visibility.theme]();
};

export default changeTheme;
