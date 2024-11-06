import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  selectionTimeMode: 12,
  onChangeTime(self) {
    console.log(self.context.selectedTime);
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
