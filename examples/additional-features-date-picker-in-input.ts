import type { Options } from '@src/types';
import { VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  isInput: true,
  positionToInput: 'center',
  onChangeToInput(e, self) {
    if (!self.private.inputElement) return;
    if (self.private.selectedDates[0]) {
      self.private.inputElement.value = self.private.selectedDates[0];
      // if you want to hide the calendar after picking a date
      self.hide();
    } else {
      self.private.inputElement.value = '';
    }
  },
};

const calendarInput = new VanillaCalendarPro('#calendar-input', options);
calendarInput.init();
