import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  type: 'year',
  onClickYear(self) {
    console.log(self.context.selectedYear);
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
