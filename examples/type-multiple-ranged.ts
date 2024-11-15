import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  type: 'multiple',
  displayMonthsCount: 2,
  monthsToSwitch: 2,
  displayDatesOutside: false,
  disableDatesPast: true,
  enableEdgeDatesOnly: true,
  selectionDatesMode: 'multiple-ranged',
};

const calendar = new Calendar('#calendar', options);
calendar.init();
