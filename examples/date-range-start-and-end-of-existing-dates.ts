import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  dateMin: '1920-01-01',
  dateMax: '2038-12-31',
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
