import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  viewType: 'month',
  onClickMonth(e, self) {
    console.log(self.private.selectedMonth);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
