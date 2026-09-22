import { Calendar, months, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';
import 'vanilla-calendar-pro/styles/months.css';

const options: Options = {
  extensions: [months],
  type: 'multiple',
  displayMonthsCount: 2,
  monthsToSwitch: 1,
  selectionDatesMode: 'multiple',
};

const calendar = new Calendar('#calendar', options);
calendar.init();
