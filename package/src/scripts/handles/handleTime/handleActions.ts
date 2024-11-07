import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const handleActions = (self: Calendar, event: Event, value: string, type: 'hour' | 'minute') => {
  const typeMap = {
    hour: () => setContext(self, 'selectedHours', value),
    minute: () => setContext(self, 'selectedMinutes', value),
  };
  typeMap[type]();

  setContext(
    self,
    'selectedTime',
    `${self.context.selectedHours}:${self.context.selectedMinutes}${self.context.selectedKeeping ? ` ${self.context.selectedKeeping}` : ''}`,
  );

  if (self.onChangeTime) self.onChangeTime(self, event, false);
  if (self.inputMode && self.context.inputElement && self.context.mainElement && self.onChangeToInput) self.onChangeToInput(self, event);
};

export default handleActions;
