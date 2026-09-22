import { Calendar, type Options, time } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';
import 'vanilla-calendar-pro/styles/time.css';

const options: Options = {
  extensions: [time],
  selectionTimeMode: 12,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
