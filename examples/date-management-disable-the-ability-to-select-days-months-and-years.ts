import type { Options } from '@src/types';
import { VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  selectionTimeMode: false,
  selectionMonthsMode: false,
  selectionYearsMode: false,
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
