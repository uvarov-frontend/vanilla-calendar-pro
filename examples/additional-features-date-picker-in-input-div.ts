import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  inputMode: true,
  positionToInput: 'center',
  onChangeToInput(self) {
    if (!self.context.inputElement) return;
    if (self.context.selectedDates[0]) {
      self.context.inputElement.innerHTML = self.context.selectedDates[0];
      // if you want to hide the calendar after picking a date
      self.hide();
    } else {
      self.context.inputElement.textContent = '';
    }
  },
};

const calendarInput = new Calendar('#calendar-input-div', options);
calendarInput.init();
