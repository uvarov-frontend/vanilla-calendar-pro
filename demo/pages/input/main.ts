// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
// import '@/package/build/vanilla-calendar.min.css';

import type { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';

import '@src/styles/vanilla-calendar.css';

const configInput: IOptions = {
  input: true,
  actions: {
    changeToInput(e, self) {
      if (!self.selectedDates || !self.HTMLInputElement) return;
      if (self.selectedDates[0]) {
        self.HTMLInputElement.value = self.selectedDates[0];
      } else {
        self.HTMLInputElement.value = '';
      }
      self.hide();
    },
  },
  settings: {
    visibility: {
      positionToInput: 'center',
    },
  },
};

const configDiv: IOptions = {
  input: true,
  actions: {
    changeToInput(e, self) {
      if (!self.selectedDates || !self.HTMLInputElement) return;
      if (self.selectedDates[0]) {
        self.HTMLInputElement.innerHTML = self.selectedDates[0];
      } else {
        self.HTMLInputElement.textContent = '';
      }
      self.hide();
    },
  },
  popups: {
    '2024-08-28': {
      modifier: 'bg-red',
      html: 'Meeting at 9:00 PM',
    },
    '2024-08-05': {
      modifier: 'bg-red text-bold',
      html: 'Meeting at 6:00 PM with a friend',
    },
    '2024-08-11': {
      modifier: 'bg-red text-bold',
      html: 'Diner at 8:00 PM with a friend',
    },
    '2024-08-19': {
      modifier: 'bg-orange',
      html: `<div>
        <u><b>12:00 PM</b></u>
        <p style="margin: 5px 0 0;">Airplane in Las Vegas</p>
      </div>`,
    },
    '2024-08-04': {
      modifier: 'bg-orange',
      html: `<div>
        <u><b>12:00 PM</b></u>
        <p style="margin: 5px 0 0;">Lunch with John for initial meeting</p>
      </div>`,
    },
  },
  settings: {
    visibility: { positionToInput: 'auto' },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendarInput = new VanillaCalendar('#calendar-input', configInput);
  calendarInput.init();

  const calendarDiv = new VanillaCalendar('#calendar-div', configDiv);
  calendarDiv.init();

  document.querySelector('#set-date')?.addEventListener('click', () => {
    calendarInput.settings.selected = {
      dates: ['2023-04-07'],
      month: 3,
      year: 2023,
    };
    calendarInput.update({
      dates: true,
      month: true,
      year: true,
    });

    calendarInput.HTMLInputElement!.value = '2023-04-07';
  });
});
