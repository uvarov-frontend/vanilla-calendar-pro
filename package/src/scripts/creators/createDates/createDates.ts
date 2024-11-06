import createDatePopup from '@scripts/creators/createDates/createDatePopup';
import createDatesFromCurrentMonth from '@scripts/creators/createDates/createDatesFromCurrentMonth';
import createDatesFromNextMonth from '@scripts/creators/createDates/createDatesFromNextMonth';
import createDatesFromPrevMonth from '@scripts/creators/createDates/createDatesFromPrevMonth';
import createWeekNumbers from '@scripts/creators/createWeekNumbers';
import type { Calendar } from '@src/index';

const createDates = (self: Calendar) => {
  const initDate = new Date(self.context.selectedYear as number, self.context.selectedMonth as number, 1);
  const datesEls = self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="dates"]');
  const weekNumbersEls = self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc-week="numbers"]');

  datesEls.forEach((datesEl, index: number) => {
    if (!self.selectionDatesMode) datesEl.dataset.vcDatesDisabled = '';
    datesEl.textContent = '';

    const currentDate = new Date(initDate);
    currentDate.setMonth(currentDate.getMonth() + index);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDayWeek = (new Date(currentYear, currentMonth, 1).getDay() - self.firstWeekday + 7) % 7;
    const days = new Date(currentYear, currentMonth + 1, 0).getDate();

    createDatesFromPrevMonth(self, datesEl, currentYear, currentMonth, firstDayWeek);
    createDatesFromCurrentMonth(self, datesEl, days, currentYear, currentMonth);
    createDatesFromNextMonth(self, datesEl, days, currentYear, currentMonth, firstDayWeek);
    createDatePopup(self, datesEl);
    createWeekNumbers(self, firstDayWeek, days, weekNumbersEls[index], datesEl);
  });
};

export default createDates;
