import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  selectedTheme: 'light',
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
