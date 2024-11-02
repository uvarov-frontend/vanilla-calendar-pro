import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  selectionTimeMode: 12,
  selectedTime: '03:44 AM',
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
