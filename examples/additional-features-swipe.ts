import { Calendar, motion, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';
import 'vanilla-calendar-pro/styles/motion.css';

const options: Options = {
  extensions: [motion],
  animation: true,
  enableSwipe: true,
  selectedDates: ['2024-06-19'],
  enableJumpToSelectedDate: true,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
