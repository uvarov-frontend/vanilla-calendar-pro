import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  input: true,
  type: 'multiple',
  settings: {
    range: {
      disablePast: true,
    },
    selection: {
      day: 'multiple-ranged',
    },
    visibility: {
      daysOutside: false,
    },
  },
  actions: {
    changeToInput(e, self) {
      if (!self.private.inputElement) return;
      if (self.selectedDates[1]) {
        self.selectedDates.sort((a, b) => +new Date(a) - +new Date(b));
        self.private.inputElement.value = `${self.selectedDates[0]} — ${self.selectedDates[self.selectedDates.length - 1]}`;
      } else if (self.selectedDates[0]) {
        self.private.inputElement.value = self.selectedDates[0];
      } else {
        self.private.inputElement.value = '';
      }
    },
  },
};

const calendarInput = new VanillaCalendar('#calendar-input', options);
calendarInput.init();
