import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  animation: { collapse: { duration: 450 }, slide: { duration: 350 } },
  enableCollapse: true,
  enableSwipe: true,
  selectedDates: ['2024-06-19'],
  enableJumpToSelectedDate: true,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
