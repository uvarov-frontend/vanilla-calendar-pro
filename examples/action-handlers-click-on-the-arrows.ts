import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  onClickArrow(event, self) {
    console.log(self.private.selectedYear, self.private.selectedMonth);
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
