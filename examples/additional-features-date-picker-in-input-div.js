import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  input: true,
  actions: {
    changeToInput(e, HTMLInputElement, dates, time, hours, minutes, keeping) {
      if (dates[0]) {
        HTMLInputElement.innerHTML = dates[0];
        // if you want to hide the calendar after picking a date
        calendar.HTMLElement.classList.add('vanilla-calendar_hidden');
      } else {
        HTMLInputElement.innerHTML = '';
      }
    },
  },
};

const calendar = new VanillaCalendar('#calendar-input-div', options);
calendar.init();
