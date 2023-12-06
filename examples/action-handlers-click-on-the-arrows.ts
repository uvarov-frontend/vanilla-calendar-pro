import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  actions: {
    clickArrow(event, self) {
      console.log(self.selectedYear, self.selectedMonth);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
