import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

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

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
