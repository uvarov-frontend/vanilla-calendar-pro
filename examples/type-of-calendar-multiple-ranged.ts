import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  viewType: 'multiple',
  displayMonthsCount: 2,
  monthsToSwitch: 2,
  displayDatesOutside: false,
  disableDatesPast: true,
  selectionDatesMode: 'multiple-ranged',
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
