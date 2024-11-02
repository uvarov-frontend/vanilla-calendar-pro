import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  isInput: true,
  viewType: 'multiple',
  displayDatesOutside: false,
  disableDatesPast: true,
  selectionDatesMode: 'multiple-ranged',
  onChangeToInput(e, self) {
    if (!self.private.inputElement) return;
    if (self.private.selectedDates[1]) {
      self.private.selectedDates.sort((a, b) => +new Date(a) - +new Date(b));
      self.private.inputElement.value = `${self.private.selectedDates[0]} — ${self.private.selectedDates[self.private.selectedDates.length - 1]}`;
    } else if (self.private.selectedDates[0]) {
      self.private.inputElement.value = self.private.selectedDates[0];
    } else {
      self.private.inputElement.value = '';
    }
  },
};

const calendarInput = new VanillaCalendarPro('#calendar-input', options);
calendarInput.init();
