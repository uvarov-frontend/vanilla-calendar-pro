import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';

const options = {
  settings: {
    visibility: {
      theme: 'light',
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
