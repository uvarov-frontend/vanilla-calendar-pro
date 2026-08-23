import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  type: 'week',
  inputMode: true,
  positionToInput: 'auto',
  animation: true,
  enableCollapse: true,
  enableSwipe: true,
  selectedDates: ['2024-06-19'],
  enableJumpToSelectedDate: true,
  onChangeToInput(self) {
    if (!self.context.inputElement) return;
    self.context.inputElement.value = self.context.selectedDates[0] ? self.context.selectedDates[0] : '';
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
