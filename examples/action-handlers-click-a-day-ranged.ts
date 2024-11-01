import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  selectionDatesMode: 'multiple-ranged',
  onClickDate(event, self) {
    console.log(self.private.selectedDates);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
