import observeHtmlElement from '@scripts/utils/observeHtmlElement';
import type { VanillaCalendarPro } from '@src/index';

const haveListener = {
  value: false,
  set: () => (haveListener.value = true),
  check: () => haveListener.value,
};

const setTheme = (htmlEl: HTMLElement, theme: VanillaCalendarPro['selectedTheme']) => (htmlEl.dataset.vcTheme = theme);

const trackChangesThemeInSystemSettings = (self: VanillaCalendarPro, supportDarkTheme: MediaQueryList) => {
  setTheme(self.private.mainElement, supportDarkTheme.matches ? 'dark' : 'light');

  if (self.selectedTheme !== 'system' || haveListener.check()) return;

  const changeDataAttrTheme = (event: MediaQueryList | MediaQueryListEvent) => {
    const calendarEls = document.querySelectorAll('[data-vc="calendar"]');
    calendarEls?.forEach((calendarEl) => setTheme(calendarEl as HTMLElement, event.matches ? 'dark' : 'light'));
  };

  if (supportDarkTheme.addEventListener) {
    supportDarkTheme.addEventListener('change', changeDataAttrTheme);
  } else {
    supportDarkTheme.addListener(changeDataAttrTheme);
  }

  haveListener.set();
};

const detectTheme = (self: VanillaCalendarPro, supportDarkTheme: MediaQueryList) => {
  const detectedThemeEl: HTMLElement | null = self.themeAttrDetect.length ? document.querySelector(self.themeAttrDetect) : null;
  const attr = (self.themeAttrDetect as string).replace(/^.*\[(.+)\]/g, (_, p1) => p1);

  if (!detectedThemeEl || detectedThemeEl.getAttribute(attr) === 'system') {
    trackChangesThemeInSystemSettings(self, supportDarkTheme);
    return;
  }

  const activeTheme = detectedThemeEl.getAttribute(attr);
  if (activeTheme) {
    setTheme(self.private.mainElement, activeTheme);
    observeHtmlElement(detectedThemeEl, attr, () => {
      const activeTheme = detectedThemeEl.getAttribute(attr);
      if (activeTheme) setTheme(self.private.mainElement, activeTheme);
    });
  } else {
    trackChangesThemeInSystemSettings(self, supportDarkTheme);
  }
};

const handleTheme = (self: VanillaCalendarPro) => {
  if (!(window.matchMedia('(prefers-color-scheme)').media !== 'not all')) {
    setTheme(self.private.mainElement, 'light');
    return;
  }

  if (self.selectedTheme === 'system') {
    detectTheme(self, window.matchMedia('(prefers-color-scheme: dark)'));
  } else {
    setTheme(self.private.mainElement, self.selectedTheme);
  }
};

export default handleTheme;
