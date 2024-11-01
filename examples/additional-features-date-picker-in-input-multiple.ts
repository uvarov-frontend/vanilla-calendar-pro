import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
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

const calendarInput = new VanillaCalendar('#calendar-input', options);
calendarInput.init();
