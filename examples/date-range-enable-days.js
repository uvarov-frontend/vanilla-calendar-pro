import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  settings: {
    range: {
      disableAllDays: true,
      enabled: ['2022-08-10:2022-08-13', '2022-08-22'],
    },
    selected: {
      year: 2022,
      month: 7,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
