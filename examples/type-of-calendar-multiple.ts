import type { Options } from '@src/types';
import { VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  viewType: 'multiple',
  displayMonthsCount: 2,
  monthsToSwitch: 1,
  selectionDatesMode: 'multiple',
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
