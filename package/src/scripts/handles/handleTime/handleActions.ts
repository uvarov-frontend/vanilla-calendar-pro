import type { VanillaCalendarPro } from '@src/index';

const handleActions = (self: VanillaCalendarPro, event: Event, value: string, type: 'hour' | 'minute') => {
  const typeMap = {
    hour: () => (self.private.selectedHours = value),
    minute: () => (self.private.selectedMinutes = value),
  };
  typeMap[type]();

  self.private.selectedTime = `${self.private.selectedHours}:${self.private.selectedMinutes}${self.private.selectedKeeping ? ` ${self.private.selectedKeeping}` : ''}`;

  if (self.onChangeTime) self.onChangeTime(self, event, false);
  if (self.isInput && self.private.inputElement && self.private.mainElement && self.onChangeToInput) self.onChangeToInput(self, event);
};

export default handleActions;
