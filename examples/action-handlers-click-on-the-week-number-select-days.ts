import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  settings: {
    selection: {
      day: 'multiple-ranged',
    },
    visibility: {
      weekNumbers: true,
    },
  },
  actions: {
    clickWeekNumber(event, number, days, year, self) {
      self.settings.selected.dates = days.map((day) => day.dataset.calendarDay);
      self.update({ dates: true });
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
