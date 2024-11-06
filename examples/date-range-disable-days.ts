import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  displayDateMin: '2022-07-01',
  displayDateMax: '2022-09-30',
  disableDates: ['2022-08-10:2022-08-13', '2022-08-22'],
  selectedYear: 2022,
  selectedMonth: 7,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
