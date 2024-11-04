import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  viewType: 'year',
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
