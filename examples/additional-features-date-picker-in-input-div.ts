import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  input: true,
  actions: {
    changeToInput(e, calendar, self) {
      if (!self.HTMLInputElement) return;
      if (self.selectedDates[0]) {
        self.HTMLInputElement.innerHTML = self.selectedDates[0];
        // if you want to hide the calendar after picking a date
        calendar.hide();
      } else {
        self.HTMLInputElement.innerHTML = '';
      }
    },
  },
  settings: {
    visibility: {
      positionToInput: 'center',
    },
  },
};

const calendarInput = new VanillaCalendar('#calendar-input-div', options);
calendarInput.init();
