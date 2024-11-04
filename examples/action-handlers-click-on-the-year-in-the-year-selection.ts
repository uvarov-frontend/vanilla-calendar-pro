import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  viewType: 'year',
  onClickYear(self) {
    console.log(self.private.selectedYear);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
