import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

const options = {
  settings: {
    selection: {
      time: 24,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
