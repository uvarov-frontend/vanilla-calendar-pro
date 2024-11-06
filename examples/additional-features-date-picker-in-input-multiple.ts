import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  inputMode: true,
  type: 'multiple',
  displayDatesOutside: false,
  disableDatesPast: true,
  selectionDatesMode: 'multiple-ranged',
  onChangeToInput(self) {
    if (!self.context.inputElement) return;
    if (self.context.selectedDates[1]) {
      self.context.selectedDates.sort((a, b) => +new Date(a) - +new Date(b));
      self.context.inputElement.value = `${self.context.selectedDates[0]} — ${self.context.selectedDates[self.context.selectedDates.length - 1]}`;
    } else if (self.context.selectedDates[0]) {
      self.context.inputElement.value = self.context.selectedDates[0];
    } else {
      self.context.inputElement.value = '';
    }
  },
};

const calendarInput = new VanillaCalendarPro('#calendar-input', options);
calendarInput.init();
