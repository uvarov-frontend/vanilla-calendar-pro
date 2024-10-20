import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  settings: {
    lang: 'define',
  },
  locale: {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
