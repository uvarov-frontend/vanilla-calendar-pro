import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  inputMode: true,
  positionToInput: 'auto',
  onChangeToInput(self) {
    if (!self.context.inputElement) return;
    if (self.context.selectedDates[0]) {
      self.context.inputElement.value = self.context.selectedDates[0];
      // if you want to hide the calendar after picking a date
      self.hide();
    } else {
      self.context.inputElement.value = '';
    }
  },
};

const calendarInput = new Calendar('#calendar', options);
calendarInput.init();
