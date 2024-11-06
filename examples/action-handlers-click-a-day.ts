import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  onClickDate(self) {
    console.log(self.context.selectedDates);
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
