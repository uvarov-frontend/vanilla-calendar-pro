import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  selectionTimeMode: false,
  selectionMonthsMode: false,
  selectionYearsMode: false,
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
