import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

const options = {
  type: 'multiple',
  months: 2,
  jumpMonths: 1,
  settings: {
    selection: {
      day: 'multiple',
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
