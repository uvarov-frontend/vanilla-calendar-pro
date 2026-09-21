import { Calendar, type Options, time } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  extensions: [time],
  selectionTimeMode: 12,
  timeMinHour: 6,
  timeMaxHour: 21,
  timeMinMinute: 10,
  timeMaxMinute: 40,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
