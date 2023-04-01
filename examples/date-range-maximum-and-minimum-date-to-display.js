import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  date: {
    min: '1920-01-01',
    max: '2038-12-31',
  },
  settings: {
    range: {
      min: '2000-01-01',
      max: '2024-12-31',
    },
    visibility: {
      disabled: true,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
