import createCurrentMonth from '@scripts/creators/createDates/createCurrentMonth';
import createDatePopup from '@scripts/creators/createDates/createDatePopup';
import createNextMonth from '@scripts/creators/createDates/createNextMonth';
import createPrevMonth from '@scripts/creators/createDates/createPrevMonth';
import createWeekNumbers from '@scripts/creators/createDates/createWeekNumbers';
import type VanillaCalendar from '@src/vanilla-calendar';

const createDates = (self: VanillaCalendar) => {
  const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);
  const datesEls = self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc="dates"]');
  const weekNumbersEls = self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc-week="numbers"]');

  datesEls.forEach((dateEl, index: number) => {
    if (!self.settings.selection.day) dateEl.dataset.vcDatesDisabled = '';

    const currentDate = new Date(initDate);
    currentDate.setMonth(currentDate.getMonth() + index);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDayWeek = (new Date(currentYear, currentMonth, 1).getDay() - self.weekStartDay + 7) % 7;
    const days = new Date(currentYear, currentMonth + 1, 0).getDate();

    dateEl.textContent = '';

    createPrevMonth(self, dateEl, currentYear, currentMonth, firstDayWeek);
    createCurrentMonth(self, dateEl, days, currentYear, currentMonth);
    createNextMonth(self, dateEl, days, currentYear, currentMonth, firstDayWeek);
    createWeekNumbers(self, firstDayWeek, days, weekNumbersEls[index], dateEl);
    createDatePopup(self, dateEl);
  });
};

export default createDates;
