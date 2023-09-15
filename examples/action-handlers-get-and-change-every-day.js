import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  actions: {
    getDays(day, date, HTMLElement, HTMLButtonElement) {
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
