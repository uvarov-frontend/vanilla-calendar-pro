import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  settings: {
    selection: {
      day: 'multiple',
    },
    selected: {
      dates: ['2022-01-09:2022-01-13', '2022-01-22'],
      month: 0,
      year: 2022,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
