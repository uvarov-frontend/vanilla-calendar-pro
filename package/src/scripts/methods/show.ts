import hide from '@scripts/methods/hide';
import getTabbables from '@scripts/utils/getTabbables';
import setPosition from '@scripts/utils/positions/setPosition';
import setContext from '@scripts/utils/setContext';
import { showToAT } from '@scripts/utils/toggleTabbing';
import type { Calendar } from '@src/index';

const pending = new WeakMap<Calendar, ReturnType<typeof setTimeout>>();

export const cancelPendingShow = (self: Calendar) => {
  clearTimeout(pending.get(self));
  pending.delete(self);
};

export const scheduleShow = (self: Calendar) => {
  cancelPendingShow(self);
  pending.set(
    self,
    setTimeout(() => {
      pending.delete(self);
      if (!self.context.isDestroyed) show(self);
    }),
  );
};

const show = (self: Calendar) => {
  cancelPendingShow(self);
  if (self.context.isShowInInputMode || self.context.isDestroyed) return;

  if (!self.context.currentType) {
    self.context.mainElement.click();
    return;
  }

  setContext(self, 'cleanupHandlers', []);
  setContext(self, 'isShowInInputMode', true);
  if (self.inputMode) showToAT(self.context.mainElement);
  setPosition(self.context.inputElement, self.context.mainElement, self.positionToInput);
  self.context.mainElement.removeAttribute('data-vc-calendar-hidden');
  if (self.context.inputElement?.hasAttribute('aria-expanded')) self.context.inputElement.setAttribute('aria-expanded', 'true');

  const handleResize = () => {
    setPosition(self.context.inputElement, self.context.mainElement, self.positionToInput);
  };
  window.addEventListener('resize', handleResize);
  self.context.cleanupHandlers.push(() => window.removeEventListener('resize', handleResize));

  // Tabbing out of the popup closes it too: it sits at the end of the body, so the focus would leave the form. hide()
  // puts the focus back on the field, from where a forward Tab carries on to the next field and Shift+Tab stays put.
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') return hide(self);
    if (e.key !== 'Tab') return;
    const tabbables = getTabbables(self.context.mainElement);
    // composedPath() also sees through a shadow root, where e.target is retargeted to the host
    if (e.composedPath()[0] !== tabbables[e.shiftKey ? 0 : tabbables.length - 1]) return;
    if (e.shiftKey) e.preventDefault();
    hide(self);
  };
  document.addEventListener('keydown', handleKeydown);
  self.context.cleanupHandlers.push(() => document.removeEventListener('keydown', handleKeydown));

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
