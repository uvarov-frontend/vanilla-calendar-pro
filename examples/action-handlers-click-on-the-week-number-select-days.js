import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options = {
  settings: {
    selection: {
      day: 'multiple-ranged',
    },
    visibility: {
      weekNumbers: true,
    },
  },
  actions: {
    clickWeekNumber(event, number, days, year) {
      calendar.settings.selected.dates = days.map((day) => day.dataset.calendarDay);
      calendar.update();
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
