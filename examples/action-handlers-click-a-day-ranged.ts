import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  settings: {
    selection: {
      day: 'multiple-ranged',
    },
  },
  actions: {
    clickDay(event, self) {
      console.log(self.selectedDates);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
