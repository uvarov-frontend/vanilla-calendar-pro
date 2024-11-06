import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  type: 'year',
  onClickYear(self) {
    console.log(self.context.selectedYear);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
