// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
// import '@/package/build/vanilla-calendar.min.css';

import type { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';

import '@src/styles/vanilla-calendar.css';

const config: IOptions = {
  type: 'multiple',
  settings: {
    selection: {
      day: 'multiple-ranged',
    },
    selected: {
      month: 3,
      year: 2023,
    },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendar('#calendar', config);
  calendar.init();
});
