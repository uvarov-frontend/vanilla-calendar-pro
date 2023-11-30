import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

const options = {
  type: 'year',
  actions: {
    clickYear(event, year) {
      console.log(year);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
