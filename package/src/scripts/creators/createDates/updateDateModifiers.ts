import { setDaysAsDisabled } from '@scripts/creators/createDates/createDate';
import { prepareDateRules } from '@scripts/creators/createDates/dateRules';
import setDateModifier from '@scripts/creators/createDates/setDateModifier';
import getDate from '@scripts/utils/getDate';
import updateRovingTabIndex from '@scripts/utils/rovingTabIndex';
import type { Calendar, FormatDateString, WeekDayID } from '@src/index';

const updateDateModifiers = (self: Calendar, recreate = false) => {
  prepareDateRules(self);
  const dateEls = self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc-date]');
  dateEls.forEach((dateEl) => {
    const dateBtnEl = dateEl.querySelector<HTMLButtonElement>('[data-vc-date-btn]') as HTMLButtonElement;
    const dateStr = dateEl.dataset.vcDate as FormatDateString;
    const date = getDate(dateStr);
    const dayWeekID = date.getDay() as WeekDayID;
    if (recreate) setDaysAsDisabled(self, dateStr, dayWeekID);
    const monthType = recreate ? (dateEl.dataset.vcDateMonth as 'current' | 'prev' | 'next') : 'current';
    // Adjacent-month cells use the year of their owning grid during creation.
    if (monthType === 'prev') date.setMonth(date.getMonth() + 1, 1);
    if (monthType === 'next') date.setMonth(date.getMonth() - 1, 1);
    setDateModifier(self, recreate ? date.getFullYear() : self.context.selectedYear, dateEl, dateBtnEl, dayWeekID, dateStr, monthType);
  });

  updateRovingTabIndex(self);
};

export default updateDateModifiers;
