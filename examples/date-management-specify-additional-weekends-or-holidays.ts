import type { Options } from '@src/types';
import VanillaCalendar from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  selectedMonth: 0,
  selectedYear: 2022,
  selectedHolidays: ['2022-01-01:2022-01-05', '2022-01-10', '2022-01-13'],
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
