import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  selectionTimeMode: 12,
  onChangeTime(self) {
    console.log(self.context.selectedTime);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
