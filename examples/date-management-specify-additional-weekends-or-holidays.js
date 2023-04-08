import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  settings: {
    selected: {
      month: 0,
      year: 2022,
      holidays: ['2022-01-01:2022-01-05', '2022-01-10', '2022-01-13'],
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
