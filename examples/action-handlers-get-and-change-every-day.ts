import VanillaCalendar from 'vanilla-calendar-pro';
import type { Options } from '@package/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  // getDays(day, date, HTMLElement, HTMLButtonElement, _self) {
  //   const randomBoolean = Math.random() < 0.5;
  //   if (!randomBoolean) return;
  //   const randomPrice = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  //   HTMLButtonElement.style.flexDirection = 'column';
  //   HTMLButtonElement.innerHTML = `
  //     <span>${day}</span>
  //     <span style="font-size: 8px;color: #8BC34A;">$${randomPrice}</span>
  //   `;
  // },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
