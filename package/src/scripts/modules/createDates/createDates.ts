import createCurrentMonth from '@scripts/modules/createDates/createCurrentMonth';
import createDatePopup from '@scripts/modules/createDates/createDatePopup';
import createNextMonth from '@scripts/modules/createDates/createNextMonth';
import createPrevMonth from '@scripts/modules/createDates/createPrevMonth';
import createWeekNumbers from '@scripts/modules/createDates/createWeekNumbers';
import type VanillaCalendar from '@src/vanilla-calendar';

const createDays = (self: VanillaCalendar) => {
  const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);
  const datesEls = self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc="dates"]');
  const weekNumbersEls = self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc-week="numbers"]');

  datesEls.forEach((dateEl, index: number) => {
    if (!self.settings.selection.day) dateEl.dataset.vcDatesDisabled = '';

    const currentDate = new Date(initDate);
    currentDate.setMonth(currentDate.getMonth() + index);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const days = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const firstDayWeek = self.settings.iso8601 ? (firstDay.getDay() !== 0 ? firstDay.getDay() : 7) - 1 : firstDay.getDay();

    dateEl.textContent = '';

    createPrevMonth(self, dateEl, currentYear, currentMonth, firstDayWeek);
    createCurrentMonth(self, dateEl, days, currentYear, currentMonth);
    createNextMonth(self, dateEl, days, currentYear, currentMonth, firstDayWeek);
    createWeekNumbers(self, firstDayWeek, days, weekNumbersEls[index], dateEl);
    createDatePopup(self, dateEl);
  });
};

export default createDays;
