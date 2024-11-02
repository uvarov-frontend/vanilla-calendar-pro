import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  selectionTimeMode: 12,
  timeControls: 'range',
  timeStepHour: 5,
  timeStepMinute: 5,
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
