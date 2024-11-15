import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  selectionTimeMode: 24,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
