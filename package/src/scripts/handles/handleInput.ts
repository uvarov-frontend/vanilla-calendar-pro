import createToInput from '@scripts/creators/createToInput';
import { show } from '@scripts/methods';
import canOpenOnFocus from '@scripts/utils/canOpenOnFocus';
import setContext from '@scripts/utils/setContext';
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
    if (!canOpenOnFocus(self)) return;
    handleOpenCalendar();
  };

  if (shouldHandleFocus) {
    (self.context.inputElement as HTMLInputElement).addEventListener('focus', handleOpenOnFocus);
  }

  return () => {
    (self.context.inputElement as HTMLInputElement).removeEventListener('click', handleOpenCalendar);

    if (shouldHandleFocus) {
      (self.context.inputElement as HTMLInputElement).removeEventListener('focus', handleOpenOnFocus);
    }
  };
};

export default handleInput;
