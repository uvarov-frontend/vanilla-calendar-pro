import type { Options } from '@src/types';
import { VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  selectionTimeMode: 12,
  timeControls: 'range',
  timeStepHour: 5,
  timeStepMinute: 5,
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
