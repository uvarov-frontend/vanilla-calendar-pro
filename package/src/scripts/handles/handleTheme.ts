import getRootNode from '@scripts/utils/getRootNode';
import observeHtmlElement from '@scripts/utils/observeHtmlElement';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const haveListener = {
  value: false,
  set: () => (haveListener.value = true),
  check: () => haveListener.value,
};

const setTheme = (htmlEl: HTMLElement, theme: Calendar['selectedTheme']) => (htmlEl.dataset.vcTheme = theme);

const addMediaQueryListener = (mediaQuery: MediaQueryList, listener: (event: MediaQueryList | MediaQueryListEvent) => void) => {
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }
  mediaQuery.addListener(listener);
  return () => mediaQuery.removeListener(listener);
};

const trackChangesThemeInSystemSettings = (self: Calendar, supportDarkTheme: MediaQueryList) => {
  setTheme(self.context.mainElement, supportDarkTheme.matches ? 'dark' : 'light');

  if (self.selectedTheme !== 'system' || self.context.cleanupSystemTheme) return;

  // document.querySelectorAll below can't reach into a Shadow DOM, so an instance rendered
  // inside one can't rely on the shared, page-wide broadcast listener - give it its own
  // listener instead, scoped to just this instance.
  if (getRootNode(self.context.mainElement) !== document) {
    const updateThisInstance = (event: MediaQueryList | MediaQueryListEvent) => setTheme(self.context.mainElement, event.matches ? 'dark' : 'light');
    setContext(self, 'cleanupSystemTheme', addMediaQueryListener(supportDarkTheme, updateThisInstance));
    return;
  }

  if (haveListener.check()) return;

  const changeDataAttrTheme = (event: MediaQueryList | MediaQueryListEvent) => {
    const calendarEls = document.querySelectorAll('[data-vc="calendar"]');
    calendarEls?.forEach((calendarEl) => setTheme(calendarEl as HTMLElement, event.matches ? 'dark' : 'light'));
  };

  addMediaQueryListener(supportDarkTheme, changeDataAttrTheme);
  haveListener.set();
};

const detectTheme = (self: Calendar, supportDarkTheme: MediaQueryList) => {
  const detectedThemeEl: HTMLElement | null = self.themeAttrDetect.length ? document.querySelector(self.themeAttrDetect) : null;
  const attr = (self.themeAttrDetect as string).replace(/^.*\[(.+)\]/g, (_, p1) => p1);

  if (!detectedThemeEl || detectedThemeEl.getAttribute(attr) === 'system') {
    trackChangesThemeInSystemSettings(self, supportDarkTheme);
    return;
  }

  const activeTheme = detectedThemeEl.getAttribute(attr);
  if (activeTheme) {
    setTheme(self.context.mainElement, activeTheme);
    observeHtmlElement(detectedThemeEl, attr, () => {
      const activeTheme = detectedThemeEl.getAttribute(attr);
      if (activeTheme) setTheme(self.context.mainElement, activeTheme);
    });
  } else {
    trackChangesThemeInSystemSettings(self, supportDarkTheme);
  }
};

const handleTheme = (self: Calendar) => {
  if (!(window.matchMedia('(prefers-color-scheme)').media !== 'not all')) {
    setTheme(self.context.mainElement, 'light');
    return;
  }

  if (self.selectedTheme === 'system') {
    detectTheme(self, window.matchMedia('(prefers-color-scheme: dark)'));
  } else {
    setTheme(self.context.mainElement, self.selectedTheme);
  }
};

export default handleTheme;
