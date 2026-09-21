import { Calendar, type Options, timePicker } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  extensions: [timePicker],
  selectionTimeMode: 12,
  timeControls: 'range',
  timeStepHour: 5,
  timeStepMinute: 5,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
