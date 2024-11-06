import type { VanillaCalendarPro } from '@src/index';

const handleActions = (self: VanillaCalendarPro, event: Event, value: string, type: 'hour' | 'minute') => {
  const typeMap = {
    hour: () => (self.context.selectedHours = value),
    minute: () => (self.context.selectedMinutes = value),
  };
  typeMap[type]();

  self.context.selectedTime = `${self.context.selectedHours}:${self.context.selectedMinutes}${self.context.selectedKeeping ? ` ${self.context.selectedKeeping}` : ''}`;

  if (self.onChangeTime) self.onChangeTime(self, event, false);
  if (self.inputMode && self.context.inputElement && self.context.mainElement && self.onChangeToInput) self.onChangeToInput(self, event);
};

export default handleActions;
