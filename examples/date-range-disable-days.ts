import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  displayDateMin: '2022-07-01',
  displayDateMax: '2022-09-30',
  disableDates: ['2022-08-10:2022-08-13', '2022-08-22'],
  settings: {
    selected: {
      year: 2022,
      month: 7,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
