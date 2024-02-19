import VanillaCalendar from '@src/vanilla-calendar';
import messages from '@scripts/helpers/getMessages';

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

	const changeDataAttrTheme = (event: MediaQueryList | MediaQueryListEvent) => {
		const calendarEls = document.querySelectorAll(`.${self.CSSClasses.calendar}`);
		calendarEls?.forEach((calendarEl) => setTheme(calendarEl as HTMLElement, event.matches ? 'dark' : 'light'));
	};

	if (supportDarkTheme.addEventListener) {
		supportDarkTheme.addEventListener('change', changeDataAttrTheme);
	} else {
		supportDarkTheme.addListener(changeDataAttrTheme);
	}
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
		return;
	}

	const attr = (self.settings.visibility.themeDetect as string).replace(/^.*\[(.+)\]/g, (_, p1) => p1);
	const activeTheme = getTheme(detectedThemeEl, attr);

	if (activeTheme) {
		setTheme(self.HTMLElement, activeTheme);
		trackChangesThemeInHTMLElement(self, detectedThemeEl, attr);
	} else {
		trackChangesThemeInSystemSettings(self, supportDarkTheme);
	}
};

const changeTheme = (self: VanillaCalendar) => {
	if (!themes.includes(self.settings.visibility.theme)) throw new Error(messages.incorrectTheme);

	if (!(window.matchMedia('(prefers-color-scheme)').media !== 'not all')) {
		setTheme(self.HTMLElement, 'light');
		return;
	}

	const mapThemes = {
		light: () => setTheme(self.HTMLElement, 'light'),
		dark: () => setTheme(self.HTMLElement, 'dark'),
		system: () => detectTheme(self, window.matchMedia('(prefers-color-scheme: dark)')),
	};
	mapThemes[self.settings.visibility.theme]();
};

export default changeTheme;
