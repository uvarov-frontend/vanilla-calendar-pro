import { Calendar, type Options, timePicker } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  extensions: [timePicker],
  selectionTimeMode: 12,
  onChangeTime(self) {
    console.log(self.context.selectedTime);
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
