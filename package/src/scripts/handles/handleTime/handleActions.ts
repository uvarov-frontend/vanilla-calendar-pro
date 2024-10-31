import type VanillaCalendar from '@src/vanilla-calendar';

const handleActions = (self: VanillaCalendar, event: Event, value: string, type: 'hour' | 'minute') => {
  const typeMap = {
    hour: () => (self.private.selectedHours = value),
    minute: () => (self.private.selectedMinutes = value),
  };
  typeMap[type]();

  self.private.selectedTime = `${self.private.selectedHours}:${self.private.selectedMinutes}${self.private.selectedKeeping ? ` ${self.private.selectedKeeping}` : ''}`;

  if (self.actions.changeTime) self.actions.changeTime(event, self, false);
  if (self.input && self.private.inputElement && self.private.mainElement && self.actions.changeToInput) self.actions.changeToInput(event, self);
};

export default handleActions;
