import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  dateToday: new Date('2022-01-07T00:00:00.000Z'),
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
