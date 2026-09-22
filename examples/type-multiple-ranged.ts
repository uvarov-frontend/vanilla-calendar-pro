import { Calendar, months, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';
import 'vanilla-calendar-pro/styles/months.css';

const options: Options = {
  extensions: [months],
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
