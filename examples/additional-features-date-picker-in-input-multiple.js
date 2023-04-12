import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  input: true,
  type: 'multiple',
  settings: {
    range: {
      disablePast: true,
    },
    selection: {
      day: 'multiple-ranged',
    },
    visibility: {
      daysOutside: false,
    },
  },
  actions: {
    changeToInput(e, HTMLInputElement, dates, time, hours, minutes, keeping) {
      if (dates[1]) {
        dates.sort((a, b) => +new Date(a) - +new Date(b));
        HTMLInputElement.value = `${dates[0]} — ${dates[dates.length - 1]}`;
      } else if (dates[0]) {
        HTMLInputElement.value = dates[0];
      } else {
        HTMLInputElement.value = '';
      }
    },
  },
};

const calendar = new VanillaCalendar('#calendar-input', options);
calendar.init();
