import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  settings: {
    selection: {
      time: true,
    },
    selected: {
      time: '03:44 AM',
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
