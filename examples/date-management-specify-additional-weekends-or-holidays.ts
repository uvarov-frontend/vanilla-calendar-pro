import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  selectedMonth: 0,
  selectedYear: 2022,
  selectedHolidays: ['2022-01-01:2022-01-05', '2022-01-10', '2022-01-13'],
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
