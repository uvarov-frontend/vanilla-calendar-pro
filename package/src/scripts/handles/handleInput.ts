import createToInput from '@scripts/creators/createToInput';
import { show } from '@scripts/methods';
import canOpenOnFocus from '@scripts/utils/canOpenOnFocus';
import setContext from '@scripts/utils/setContext';
import { clearSkipOpenOnFocus, shouldSkipOpenOnFocus } from '@scripts/utils/skipOpenOnFocus';
import type { Calendar } from '@src/index';

const handleInput = (self: Calendar) => {
  setContext(self, 'inputElement', self.context.mainElement as HTMLInputElement);

  const handleOpenCalendar = () => {
    if (self.context.inputModeInit) {
      setTimeout(() => show(self));
      return;
    }
    createToInput(self);
  };

  (self.context.inputElement as HTMLInputElement).addEventListener('click', handleOpenCalendar);

  const shouldHandleFocus = typeof self.openOnFocus === 'function' || self.openOnFocus === true;

  const handleOpenOnFocus = () => {
    if (shouldSkipOpenOnFocus(self)) {
      clearSkipOpenOnFocus(self);
      return;
    }
    if (!canOpenOnFocus(self)) return;
    handleOpenCalendar();
  };

  if (shouldHandleFocus) {
    (self.context.inputElement as HTMLInputElement).addEventListener('focus', handleOpenOnFocus);
  }

  const focusIntoCalendar = (event: KeyboardEvent) => {
    if (!self.context.isShowInInputMode) return false;
    if (document.activeElement !== self.context.inputElement) return false;

    const isFocusable = (el: HTMLElement) => el.tabIndex >= 0 && !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true';

    const walker = document.createTreeWalker(self.context.mainElement, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        const el = node as HTMLElement;
        if (!isFocusable(el)) return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const focusTarget = (walker.nextNode() as HTMLElement | null) ?? (isFocusable(self.context.mainElement) ? self.context.mainElement : null);

    if (!focusTarget || focusTarget.tabIndex < 0) return false;

    event.preventDefault();
    focusTarget.focus();
    return true;
  };

  const handleKeyIntoCalendar = (event: KeyboardEvent) => {
    const isTab = event.key === 'Tab' && !event.shiftKey;
    const isArrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);
    if (!isTab && !isArrow) return;
    focusIntoCalendar(event);
  };

  (self.context.inputElement as HTMLInputElement).addEventListener('keydown', handleKeyIntoCalendar);

  return () => {
    (self.context.inputElement as HTMLInputElement).removeEventListener('click', handleOpenCalendar);

    if (shouldHandleFocus) {
      (self.context.inputElement as HTMLInputElement).removeEventListener('focus', handleOpenOnFocus);
    }

    (self.context.inputElement as HTMLInputElement).removeEventListener('keydown', handleKeyIntoCalendar);
  };
};

export default handleInput;
