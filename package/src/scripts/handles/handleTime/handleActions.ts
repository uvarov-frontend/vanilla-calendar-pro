import type VanillaCalendar from '@src/vanilla-calendar';

const handleActions = (self: VanillaCalendar, event: Event, value: string, type: 'hour' | 'minute') => {
  const typeMap = {
    hour: () => (self.selectedHours = value),
    minute: () => (self.selectedMinutes = value),
  };
  typeMap[type]();

  self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ''}`;

  if (self.actions.changeTime) self.actions.changeTime(event, self, false);
  if (self.input && self.private.inputElement && self.private.mainElement && self.actions.changeToInput) self.actions.changeToInput(event, self);
};

export default handleActions;
