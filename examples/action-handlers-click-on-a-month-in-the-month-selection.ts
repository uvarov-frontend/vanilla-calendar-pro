import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  type: 'month',
  actions: {
    clickMonth(e, self) {
      console.log(self.selectedMonth);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
