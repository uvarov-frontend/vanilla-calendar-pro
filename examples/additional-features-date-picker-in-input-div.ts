import VanillaCalendar from 'vanilla-calendar-pro';
import type { Options } from '@package/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  isInput: true,
  positionToInput: 'center',
  onChangeToInput(e, self) {
    if (!self.private.inputElement) return;
    if (self.private.selectedDates[0]) {
      self.private.inputElement.innerHTML = self.private.selectedDates[0];
      // if you want to hide the calendar after picking a date
      self.hide();
    } else {
      self.private.inputElement.textContent = '';
    }
  },
};

const calendarInput = new VanillaCalendar('#calendar-input-div', options);
calendarInput.init();
