import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  disableAllDates: true,
  enableDates: ['2022-08-10:2022-08-13', '2022-08-22'],
  selectedYear: 2022,
  selectedMonth: 7,
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
