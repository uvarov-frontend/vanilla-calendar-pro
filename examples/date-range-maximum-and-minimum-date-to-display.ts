import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  dateMin: '1920-01-01',
  dateMax: '2038-12-31',
  settings: {
    range: {
      min: '2000-01-01',
      max: '2024-12-31',
    },
    visibility: {
      disabled: true,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
