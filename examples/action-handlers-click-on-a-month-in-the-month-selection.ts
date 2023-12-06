import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  type: 'month',
  actions: {
    clickMonth(e, self) {
      console.log(self.selectedMonth);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
