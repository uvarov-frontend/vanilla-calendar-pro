import '../../workbench';

import { annotations, Calendar, type Options } from '@src/index';

import '@src/styles/core.css';
import '@src/styles/annotations.css';

document.addEventListener('DOMContentLoaded', () => {
  // reproduction from https://github.com/uvarov-frontend/vanilla-calendar-pro/issues/406
  const options: Options = {
    extensions: [annotations],
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
