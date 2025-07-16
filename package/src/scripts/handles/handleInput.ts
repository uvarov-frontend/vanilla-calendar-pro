import createToInput from '@scripts/creators/createToInput';
import { show } from '@scripts/methods';
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
  (self.context.inputElement as HTMLInputElement).addEventListener('focus', handleOpenCalendar);

  return () => {
    (self.context.inputElement as HTMLInputElement).removeEventListener('click', handleOpenCalendar);
    (self.context.inputElement as HTMLInputElement).removeEventListener('focus', handleOpenCalendar);
  };
};

export default handleInput;
