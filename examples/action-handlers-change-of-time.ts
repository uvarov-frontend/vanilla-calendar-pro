import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  settings: {
    selection: {
      time: true,
    },
  },
  actions: {
    changeTime(event, self) {
      console.log(self.selectedTime);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
