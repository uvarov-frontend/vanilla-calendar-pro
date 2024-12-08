import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  type: 'multiple',
  monthsToSwitch: 1,
  displayMonthsCount: 12,
  monthsToSwitchFast: 12,
  selectionDatesMode: 'multiple',
};

const calendar = new Calendar('#calendar', options);
calendar.init();
