import { Calendar, motion, type Options, weeks } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';
import 'vanilla-calendar-pro/styles/motion.css';
import 'vanilla-calendar-pro/styles/weeks.css';

const options: Options = {
  extensions: [motion, weeks],
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
