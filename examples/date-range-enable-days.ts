import type { Options } from '@src/types';
import { VanillaCalendar } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  disableAllDates: true,
  enableDates: ['2022-08-10:2022-08-13', '2022-08-22'],
  selectedYear: 2022,
  selectedMonth: 7,
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
