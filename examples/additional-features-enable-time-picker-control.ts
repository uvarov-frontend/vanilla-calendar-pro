import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  selectionTimeMode: 12,
  timeControls: 'range',
  timeStepHour: 5,
  timeStepMinute: 5,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
