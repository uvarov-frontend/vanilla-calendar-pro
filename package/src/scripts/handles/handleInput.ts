import createToInput from '@scripts/creators/createToInput';
import { scheduleShow } from '@scripts/methods/show';
import canOpenOnFocus from '@scripts/utils/canOpenOnFocus';
import getRootNode from '@scripts/utils/getRootNode';
import getTabbables from '@scripts/utils/getTabbables';
import setContext from '@scripts/utils/setContext';
import { clearSkipOpenOnFocus, shouldSkipOpenOnFocus } from '@scripts/utils/skipOpenOnFocus';
import type { Calendar } from '@src/index';

const handleInput = (self: Calendar) => {
  setContext(self, 'inputElement', self.context.mainElement as HTMLInputElement);
  const inputElement = self.context.inputElement as HTMLInputElement;
  // Announce that the field opens a picker. Only a form control has a role that carries it:
  // inputMode also accepts a plain element, which has none.
  if (['input', 'button', 'textarea'].includes(inputElement.localName)) {
    inputElement.setAttribute('aria-haspopup', 'dialog');
    if (inputElement.localName === 'button' || inputElement.getAttribute('role') === 'combobox') {
      inputElement.setAttribute('aria-expanded', 'false');
    }
  }

  const handleOpenCalendar = () => {
    if (self.context.inputModeInit) {
      scheduleShow(self);
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
    if (getRootNode(self.context.mainElement).activeElement !== self.context.inputElement) return false;

    const focusTarget = getTabbables(self.context.mainElement)[0];
    if (!focusTarget) return false;

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
    inputElement.removeEventListener('click', handleOpenCalendar);

    if (shouldHandleFocus) {
      inputElement.removeEventListener('focus', handleOpenOnFocus);
    }

    inputElement.removeEventListener('keydown', handleKeyIntoCalendar);
  };
};

export default handleInput;
