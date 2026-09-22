import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';

const options: Options = {
  dateToday: new Date('2022-01-07'),
};

const calendar = new Calendar('#calendar', options);
calendar.init();
