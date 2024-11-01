import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  selectionTimeMode: 12,
  onChangeTime(event, self) {
    console.log(self.private.selectedTime);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
