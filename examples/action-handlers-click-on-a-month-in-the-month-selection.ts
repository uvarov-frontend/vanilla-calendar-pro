import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  type: 'month',
  onClickMonth(self) {
    console.log(self.context.selectedMonth);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
