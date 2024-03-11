import VanillaCalendar from 'vanilla-calendar-pro';
import { IOptions } from 'vanilla-calendar-pro/types';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  actions: {
    getDays(day, date, HTMLElement, HTMLButtonElement, self) {
      const randomBoolean = Math.random() < 0.5;
      if (!randomBoolean) return;
      const randomPrice = Math.floor(Math.random() * (999 - 100 + 1) + 100);

      HTMLButtonElement.style.flexDirection = 'column';
      HTMLButtonElement.innerHTML = `
        <span>${day}</span>
        <span style="font-size: 8px;color: #8BC34A;">$${randomPrice}</span>
      `;
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
