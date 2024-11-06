import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  selectionTimeMode: false,
  selectionMonthsMode: false,
  selectionYearsMode: false,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
