import hide from '@scripts/methods/hide';
import setPosition from '@scripts/utils/positions/setPosition';
import setContext from '@scripts/utils/setContext';
import { restoreTabbing } from '@scripts/utils/toggleTabbing';
import type { Calendar } from '@src/index';

const show = (self: Calendar) => {
  if (self.context.isShowInInputMode) return;

  if (!self.context.currentType) {
    self.context.mainElement.click();
    return;
  }

  setContext(self, 'cleanupHandlers', []);
  setContext(self, 'isShowInInputMode', true);
  if (self.inputMode) restoreTabbing(self.context.mainElement);
  setPosition(self.context.inputElement, self.context.mainElement, self.positionToInput);
  self.context.mainElement.removeAttribute('data-vc-calendar-hidden');

  const handleResize = () => {
    setPosition(self.context.inputElement, self.context.mainElement, self.positionToInput);
  };
  window.addEventListener('resize', handleResize);
  self.context.cleanupHandlers.push(() => window.removeEventListener('resize', handleResize));

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') hide(self);
  };
  document.addEventListener('keydown', handleEscapeKey);
  self.context.cleanupHandlers.push(() => document.removeEventListener('keydown', handleEscapeKey));

  const documentClickEvent = (e: MouseEvent) => {
    // use composedPath() rather than e.target: for a calendar rendered inside a Shadow DOM,
    // a document-level listener sees e.target retargeted to the shadow host, which would
    // never match inputElement/mainElement and incorrectly close the calendar on its own clicks
    const clickedEl = (e.composedPath()[0] ?? e.target) as HTMLElement;
    if (clickedEl === self.context.inputElement || self.context.mainElement.contains(clickedEl)) return;
    hide(self);
  };
  document.addEventListener('click', documentClickEvent, { capture: true });
  self.context.cleanupHandlers.push(() => document.removeEventListener('click', documentClickEvent, { capture: true }));

  if (self.onShow) self.onShow(self);
};

export default show;
