import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  selectionDatesMode: 'multiple',
  selectedDates: ['2022-01-09:2022-01-13', '2022-01-22'],
  selectedMonth: 0,
  selectedYear: 2022,
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
