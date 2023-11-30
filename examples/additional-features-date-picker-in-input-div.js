import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

// start irrelevant code
document.querySelector('#calendar-input-div').style.display = 'flex';
// end irrelevant code

const options = {
  input: true,
  actions: {
    changeToInput(e, calendar, dates, time, hours, minutes, keeping) {
      if (dates[0]) {
        calendar.HTMLInputElement.innerHTML = dates[0];
        // if you want to hide the calendar after picking a date
        calendar.hide();
      } else {
        calendar.HTMLInputElement.innerHTML = '';
      }
    },
  },
};

const calendarInput = new VanillaCalendar('#calendar-input-div', options);
calendarInput.init();
