import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  onClickArrow(self) {
    console.log(self.private.selectedYear, self.private.selectedMonth);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
