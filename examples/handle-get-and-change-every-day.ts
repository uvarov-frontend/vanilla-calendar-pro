import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';

const options: Options = {
  onCreateDateEls(_self, dateEl) {
    const randomBoolean = Math.random() < 0.5;
    if (!randomBoolean) return;
    const randomPrice = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const btnEl = dateEl.querySelector('[data-vc-date-btn]') as HTMLButtonElement;
    const dayEl = document.createElement('span');
    dayEl.textContent = btnEl.textContent;
    const priceEl = document.createElement('span');
    priceEl.style.cssText = 'font-size: 8px;color: #8BC34A;';
    priceEl.textContent = `$${randomPrice}`;
    btnEl.style.flexDirection = 'column';
    btnEl.replaceChildren(dayEl, priceEl);
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
