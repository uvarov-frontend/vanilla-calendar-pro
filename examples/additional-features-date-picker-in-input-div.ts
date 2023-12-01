import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

// start irrelevant code
document.querySelector('#calendar-input-div').style.display = 'flex';
// end irrelevant code

const options: Options = {
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
