import setDateModifier from '@scripts/creators/createDates/setDateModifier';
import getDate from '@scripts/utils/getDate';
import updateRovingTabIndex from '@scripts/utils/rovingTabIndex';
import type { Calendar, FormatDateString, WeekDayID } from '@src/index';

const updateDateModifiers = (self: Calendar) => {
  const dateEls = self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc-date]');
  dateEls.forEach((dateEl) => {
    const dateBtnEl = dateEl.querySelector<HTMLButtonElement>('[data-vc-date-btn]') as HTMLButtonElement;
    const dateStr = dateEl.dataset.vcDate as FormatDateString;
    const dayWeekID = getDate(dateStr).getDay() as WeekDayID;
    setDateModifier(self, self.context.selectedYear, dateEl, dateBtnEl, dayWeekID, dateStr, 'current');
  });

  updateRovingTabIndex(self);
};

export default updateDateModifiers;
