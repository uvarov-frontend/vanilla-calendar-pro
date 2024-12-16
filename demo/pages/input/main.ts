import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

const configInput: Options = {
  inputMode: true,
  positionToInput: 'center',
  onChangeToInput(self) {
    if (!self.context.selectedDates || !self.context.inputElement) return;
    if (self.context.selectedDates[0]) {
      self.context.inputElement.value = self.context.selectedDates[0];
    } else {
      self.context.inputElement.value = '';
    }
    self.hide();
  },
};

const configDiv: Options = {
  inputMode: true,
  positionToInput: 'auto',
  onChangeToInput(self) {
    if (!self.context.selectedDates || !self.context.inputElement) return;
    if (self.context.selectedDates[0]) {
      self.context.inputElement.innerHTML = self.context.selectedDates[0];
    } else {
      self.context.inputElement.textContent = '';
    }
    self.hide();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendarInput = new Calendar('#calendar-input', configInput);
  calendarInput.init();

  const calendarDiv = new Calendar('#calendar-div', configDiv);
  calendarDiv.set({
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
  });
  calendarDiv.init();

  document.querySelector('#set-date')?.addEventListener('click', () => {
    calendarInput.set({
      selectedDates: ['2023-04-07'],
      selectedMonth: 3,
      selectedYear: 2023,
    });
    calendarInput.context.inputElement!.value = '2023-04-07';
  });
});
