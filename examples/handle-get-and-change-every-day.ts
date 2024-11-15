import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  onCreateDateEls(self, dateEl) {
    const randomBoolean = Math.random() < 0.5;
    if (!randomBoolean) return;
    const randomPrice = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const btnEl = dateEl.querySelector('[data-vc-date-btn]') as HTMLButtonElement;
    const day = btnEl.innerText;
    btnEl.style.flexDirection = 'column';
    btnEl.innerHTML = `
      <span>${day}</span>
      <span style="font-size: 8px;color: #8BC34A;">$${randomPrice}</span>
    `;
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
