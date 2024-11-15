import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  onClickArrow(self) {
    console.log(self.context.selectedYear, self.context.selectedMonth);
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
