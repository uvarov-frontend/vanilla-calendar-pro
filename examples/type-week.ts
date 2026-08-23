import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  type: 'week',
  animation: true,
  selectedDates: ['2024-06-19'],
  enableJumpToSelectedDate: true,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
