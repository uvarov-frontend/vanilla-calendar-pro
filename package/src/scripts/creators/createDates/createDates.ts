import createDatePopup from '@scripts/creators/createDates/createDatePopup';
import createDatesFromCurrentMonth from '@scripts/creators/createDates/createDatesFromCurrentMonth';
import createDatesFromNextMonth from '@scripts/creators/createDates/createDatesFromNextMonth';
import createDatesFromPrevMonth from '@scripts/creators/createDates/createDatesFromPrevMonth';
import createWeekNumbers from '@scripts/creators/createWeekNumbers';
import type { VanillaCalendarPro } from '@src/index';

const createDates = (self: VanillaCalendarPro) => {
  const initDate = new Date(self.private.selectedYear as number, self.private.selectedMonth as number, 1);
  const datesEls = self.private.mainElement.querySelectorAll<HTMLElement>('[data-vc="dates"]');
  const weekNumbersEls = self.private.mainElement.querySelectorAll<HTMLElement>('[data-vc-week="numbers"]');

  datesEls.forEach((dateEl, index: number) => {
    if (!self.selectionDatesMode) dateEl.dataset.vcDatesDisabled = '';
    dateEl.textContent = '';

    const currentDate = new Date(initDate);
    currentDate.setMonth(currentDate.getMonth() + index);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDayWeek = (new Date(currentYear, currentMonth, 1).getDay() - self.firstWeekday + 7) % 7;
    const days = new Date(currentYear, currentMonth + 1, 0).getDate();

    createDatesFromPrevMonth(self, dateEl, currentYear, currentMonth, firstDayWeek);
    createDatesFromCurrentMonth(self, dateEl, days, currentYear, currentMonth);
    createDatesFromNextMonth(self, dateEl, days, currentYear, currentMonth, firstDayWeek);
    createDatePopup(self, dateEl);
    createWeekNumbers(self, firstDayWeek, days, weekNumbersEls[index], dateEl);
  });
};

export default createDates;
