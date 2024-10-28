import type VanillaCalendar from '@src/vanilla-calendar';

const setTime = (self: VanillaCalendar, e: Event, value: string, type: 'hour' | 'minute') => {
  const typeMap = {
    hour: () => (self.selectedHours = value),
    minute: () => (self.selectedMinutes = value),
  };
  typeMap[type]();

  self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ''}`;
  if (self.actions.changeTime) self.actions.changeTime(e, self);
  if (self.input && self.HTMLInputElement && self.actions.changeToInput) self.actions.changeToInput(e, self);
};

export default setTime;
