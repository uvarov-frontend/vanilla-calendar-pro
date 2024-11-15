import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  selectionDatesMode: 'multiple',
  selectedDates: ['2022-01-09:2022-01-13', '2022-01-22'],
  selectedMonth: 0,
  selectedYear: 2022,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
