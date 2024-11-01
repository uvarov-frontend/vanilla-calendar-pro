import VanillaCalendar from 'vanilla-calendar-pro';
import type { Options } from '@package/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  viewType: 'multiple',
  displayMonthsCount: 2,
  monthsToSwitch: 1,
  selectionDatesMode: 'multiple',
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
