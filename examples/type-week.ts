import { Calendar, motion, type Options, weeks } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';
import 'vanilla-calendar-pro/styles/motion.css';
import 'vanilla-calendar-pro/styles/weeks.css';

const options: Options = {
  extensions: [motion, weeks],
  type: 'week',
  animation: true,
  selectedDates: ['2024-06-19'],
  enableJumpToSelectedDate: true,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
