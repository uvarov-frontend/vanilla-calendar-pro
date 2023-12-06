import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  type: 'year',
  actions: {
    clickYear(event, self) {
      console.log(self.selectedYear);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
