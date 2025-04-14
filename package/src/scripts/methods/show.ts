import hide from '@scripts/methods/hide';
import setPosition from '@scripts/utils/positions/setPosition';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const show = (self: Calendar) => {
  if (self.context.isShowInInputMode) return;

  if (!self.context.currentType) {
    self.context.mainElement.click();
    return;
  }

  setContext(self, 'cleanupHandlers', []);
  setContext(self, 'isShowInInputMode', true);
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
    if (e.target === self.context.inputElement || self.context.mainElement.contains(e.target as HTMLElement)) return;
    hide(self);
  };
  document.addEventListener('click', documentClickEvent, { capture: true });
  self.context.cleanupHandlers.push(() => document.removeEventListener('click', documentClickEvent, { capture: true }));

  if (self.onShow) self.onShow(self);
};

export default show;
