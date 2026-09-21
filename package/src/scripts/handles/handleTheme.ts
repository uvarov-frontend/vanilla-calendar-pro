import observeHtmlElement from '@scripts/utils/observeHtmlElement';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const subscriptions = new WeakMap<Calendar, { element: HTMLElement | null; attr: string; update: () => void }>();

const handleTheme = (self: Calendar) => {
  const supported = window.matchMedia('(prefers-color-scheme)').media !== 'not all';
  if (!supported || self.selectedTheme !== 'system') {
    self.context.cleanupSystemTheme?.();
    self.context.mainElement.dataset.vcTheme = supported ? self.selectedTheme : 'light';
    return;
  }

  const element = self.themeAttrDetect.length ? document.querySelector<HTMLElement>(self.themeAttrDetect) : null;
  const attr = self.themeAttrDetect.replace(/^.*\[(.+)\]/g, (_, name) => name);
  const previous = subscriptions.get(self);
  if (previous?.element === element && previous.attr === attr) {
    previous.update();
    return;
  }
  self.context.cleanupSystemTheme?.();

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let cleanupMedia: (() => void) | undefined;
  const update = () => {
    const theme = element?.getAttribute(attr);
    const system = !theme || theme === 'system';
    self.context.mainElement.dataset.vcTheme = system ? (media.matches ? 'dark' : 'light') : theme;
    if (system && !cleanupMedia) {
      if (media.addEventListener) {
        media.addEventListener('change', update);
        cleanupMedia = () => media.removeEventListener('change', update);
      } else {
        media.addListener(update);
        cleanupMedia = () => media.removeListener(update);
      }
    } else if (!system && cleanupMedia) {
      cleanupMedia();
      cleanupMedia = undefined;
    }
  };
  const cleanupObserver = element ? observeHtmlElement(element, attr, update) : undefined;
  subscriptions.set(self, { element, attr, update });
  setContext(self, 'cleanupSystemTheme', () => {
    cleanupObserver?.();
    cleanupMedia?.();
    subscriptions.delete(self);
    setContext(self, 'cleanupSystemTheme', undefined);
  });
  update();
};

export default handleTheme;
