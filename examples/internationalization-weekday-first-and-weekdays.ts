import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  firstWeekday: 0,
  selectedWeekends: [0, 3, 6],
};

const calendar = new Calendar('#calendar', options);
calendar.init();
