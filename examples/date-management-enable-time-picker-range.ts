import { Calendar, type Options, timePicker } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  extensions: [timePicker],
  selectionTimeMode: 12,
  timeMinHour: 6,
  timeMaxHour: 21,
  timeMinMinute: 10,
  timeMaxMinute: 40,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
