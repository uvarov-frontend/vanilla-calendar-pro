import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  settings: {
    selection: {
      time: 12,
    },
    selected: {
      time: '03:44 AM',
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
