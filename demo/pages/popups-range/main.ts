import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  // reproduction from https://github.com/uvarov-frontend/vanilla-calendar-pro/issues/406
  const options: Options = {
    selectedMonth: 1,
    selectedYear: 2026,
    popups: {
      '2026-02-10:2026-02-17': {
        modifier: 'bg-orange',
        html: "Fred's vacation",
      },
    },
  };

  const calendar = new Calendar('#calendar', options);
  calendar.init();
});
