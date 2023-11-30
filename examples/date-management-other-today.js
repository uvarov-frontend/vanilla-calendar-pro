import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

const options = {
  date: {
    today: new Date('2022-01-07'),
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
