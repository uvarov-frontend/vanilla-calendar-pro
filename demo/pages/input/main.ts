import { type Options, VanillaCalendarPro } from '@src/index';

import '@src/styles/index.css';

const configInput: Options = {
  isInput: true,
  positionToInput: 'center',
  onChangeToInput(e, self) {
    if (!self.private.selectedDates || !self.private.inputElement) return;
    if (self.private.selectedDates[0]) {
      self.private.inputElement.value = self.private.selectedDates[0];
    } else {
      self.private.inputElement.value = '';
    }
    self.hide();
  },
};

const configDiv: Options = {
  isInput: true,
  positionToInput: 'auto',
  onChangeToInput(e, self) {
    if (!self.private.selectedDates || !self.private.inputElement) return;
    if (self.private.selectedDates[0]) {
      self.private.inputElement.innerHTML = self.private.selectedDates[0];
    } else {
      self.private.inputElement.textContent = '';
    }
    self.hide();
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
};

document.addEventListener('DOMContentLoaded', () => {
  const calendarInput = new VanillaCalendarPro('#calendar-input', configInput);
  calendarInput.init();

  const calendarDiv = new VanillaCalendarPro('#calendar-div', configDiv);
  calendarDiv.init();

  document.querySelector('#set-date')?.addEventListener('click', () => {
    calendarInput.selectedDates = ['2023-04-07'];
    calendarInput.selectedMonth = 3;
    calendarInput.selectedYear = 2023;
    calendarInput.update({
      dates: true,
      month: true,
      year: true,
    });

    calendarInput.private.inputElement!.value = '2023-04-07';
  });
});
