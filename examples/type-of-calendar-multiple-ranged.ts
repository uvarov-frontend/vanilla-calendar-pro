import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  viewType: 'multiple',
  displayMonthsCount: 2,
  monthsToSwitch: 2,
  displayDatesOutside: false,
  disableDatesPast: true,
  selectionDatesMode: 'multiple-ranged',
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
