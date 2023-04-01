import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  settings: {
    visibility: {
      weekNumbers: true,
    },
  },
  actions: {
    clickWeekNumber(event, number, days, year) {
      console.log(`Week number: ${number}`);
      console.log(`Year of the week: ${year}`);
      console.log('Days of this week:', days);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
