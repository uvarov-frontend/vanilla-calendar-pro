import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  settings: {
    selection: {
      time: true,
      controlTime: 'range',
      stepHours: 5,
      stepMinutes: 5,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
