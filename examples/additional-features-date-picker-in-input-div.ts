import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  isInput: true,
  positionToInput: 'center',
  onChangeToInput(self) {
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

const calendarInput = new VanillaCalendarPro('#calendar-input-div', options);
calendarInput.init();
