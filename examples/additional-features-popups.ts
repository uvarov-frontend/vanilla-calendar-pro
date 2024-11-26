import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  selectedMonth: 6,
  selectedYear: 2024,
  popups: {
    '2024-07-03': {
      modifier: 'bg-sponsor',
      html: `
        <div>
          💖 Support the project: <a href="https://buymeacoffee.com/uvarov" rel="noopener noreferrer" target="_blank">Vanilla Calendar Pro</a>
        </div>
      `,
    },
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
