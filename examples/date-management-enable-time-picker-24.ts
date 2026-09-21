import { Calendar, type Options, time } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  extensions: [time],
  selectionTimeMode: 24,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
