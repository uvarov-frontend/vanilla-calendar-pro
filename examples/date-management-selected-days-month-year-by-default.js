import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  settings: {
    selection: {
      day: 'multiple',
    },
    selected: {
      dates: ['2022-01-09:2022-01-13', '2022-01-22'],
      month: 0,
      year: 2022,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
