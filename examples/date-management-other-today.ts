import VanillaCalendar from 'vanilla-calendar-pro';
import { IOptions } from 'vanilla-calendar-pro/types';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  date: {
    today: new Date('2022-01-07:T00:00:00.000Z'),
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
