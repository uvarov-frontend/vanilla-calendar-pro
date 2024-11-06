import setDateModifier from '@scripts/creators/createDates/setDateModifier';
import handleMonth from '@scripts/handles/handleMonth';
import handleSelectDate from '@scripts/handles/handleSelectDate';
import handleSelectDateRanged from '@scripts/handles/handleSelectDateRange/handleSelectDateRange';
import getDate from '@scripts/utils/getDate';
import type { Calendar, FormatDateString, WeekDayID } from '@src/index';

const updateDateModifier = (self: Calendar) => {
  const dateEls = self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc-date]');
  dateEls.forEach((dateEl) => {
    const dateBtnEl = dateEl.querySelector<HTMLButtonElement>('[data-vc-date-btn]') as HTMLButtonElement;
    const dateStr = dateEl.dataset.vcDate as FormatDateString;
    const dayWeekID = getDate(dateStr).getDay() as WeekDayID;
    setDateModifier(self, self.context.selectedYear, dateEl, dateBtnEl, dayWeekID, dateStr, 'current');
  });
};

const handleClickDate = (self: Calendar, event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const dateBtnEl = element.closest<HTMLButtonElement>('[data-vc-date-btn]');

  if (!self.selectionDatesMode || !['single', 'multiple', 'multiple-ranged'].includes(self.selectionDatesMode) || !dateBtnEl) return;

  const dateEl = dateBtnEl.closest('[data-vc-date]') as HTMLElement;
  const daySelectionActions = {
    single: () => handleSelectDate(self, dateEl, false),
    multiple: () => handleSelectDate(self, dateEl, true),
    'multiple-ranged': () => handleSelectDateRanged(self, dateEl),
  };
  daySelectionActions[self.selectionDatesMode]();
  self.context.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));

  if (self.onClickDate) self.onClickDate(self, event);
  if (self.inputMode && self.context.inputElement && self.context.mainElement && self.onChangeToInput) self.onChangeToInput(self, event);

  const dayPrevEl = element.closest('[data-vc-date-month="prev"]');
  const dayNextEl = element.closest('[data-vc-date-month="next"]');

  const actionMapping = {
    prev: () => (self.enableMonthChangeOnDayClick ? handleMonth(self, 'prev') : updateDateModifier(self)),
    next: () => (self.enableMonthChangeOnDayClick ? handleMonth(self, 'next') : updateDateModifier(self)),
    current: () => updateDateModifier(self),
  };

  actionMapping[dayPrevEl ? 'prev' : dayNextEl ? 'next' : 'current']();
};

export default handleClickDate;
