import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  enableWeekNumbers: true,
  onClickWeekNumber(self, number, year, days) {
    console.log(`Week number: ${number}`);
    console.log(`Year of the week: ${year}`);
    console.log('Days of this week:', days);
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
