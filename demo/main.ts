import './workbench';

import { Calendar, time } from '@src/index';

import '@src/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const selectedTime = today.toLocaleString('en-US', { hour12: true, minute: '2-digit', hour: '2-digit' });

  const inspect = (self: Calendar) => {
    document.querySelector('#state-dates')!.textContent = JSON.stringify(self.context.selectedDates);
    document.querySelector('#state-time')!.textContent = self.context.selectedTime ?? '—';
    document.querySelector('#state-month')!.textContent = `${self.context.selectedYear}-${String(self.context.selectedMonth + 1).padStart(2, '0')}`;
  };

  const calendar = new Calendar('#calendar', {
    extensions: [time],
    selectedMonth: 3,
    selectedYear: 2023,
    selectionTimeMode: 12,
    selectedTime,
    onInit: inspect,
    onClickDate: inspect,
    onChangeTime: inspect,
    onClickArrow: inspect,
    onClickMonth: inspect,
    onClickYear: inspect,
  });
  calendar.init();
});
