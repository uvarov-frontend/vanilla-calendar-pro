import type { FormatDateString, WeekDayID } from '@package/types';
import setDateModifier from '@scripts/creators/createDates/setDateModifier';
import handleMonth from '@scripts/handles/handleMonth';
import handleSelectDate from '@scripts/handles/handleSelectDate';
import handleSelectDateRanged from '@scripts/handles/handleSelectDateRange';
import getDate from '@scripts/utils/getDate';
import type VanillaCalendar from '@src/vanilla-calendar';

const updateDateModifier = (self: VanillaCalendar) => {
  const dateEls = self.private.mainElement.querySelectorAll<HTMLElement>('[data-vc-date]');
  dateEls.forEach((dateEl) => {
    const dateBtnEl = dateEl.querySelector<HTMLButtonElement>('[data-vc-date-btn]') as HTMLButtonElement;
    const dateStr = dateEl.dataset.vcDate as FormatDateString;
    const dayWeekID = getDate(dateStr).getDay() as WeekDayID;
    setDateModifier(self, self.private.selectedYear, dateEl, dateBtnEl, dayWeekID, dateStr, 'current');
  });
};

const handleClickDate = (self: VanillaCalendar, event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const dateBtnEl = element.closest<HTMLButtonElement>('[data-vc-date-btn]');

  if (!self.selectionDatesMode || !['single', 'multiple', 'multiple-ranged'].includes(self.selectionDatesMode) || !dateBtnEl) return;

  const dateEl = dateBtnEl.closest('[data-vc-date]') as HTMLElement;
  const daySelectionActions = {
    single: () => handleSelectDate(self, dateEl, false),
    multiple: () => handleSelectDate(self, dateEl, true),
    'multiple-ranged': () => handleSelectDateRanged(self, dateEl.dataset.vcDate as FormatDateString),
  };
  daySelectionActions[self.selectionDatesMode]();
  self.private.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));

  if (self.onClickDate) self.onClickDate(event, self);
  if (self.isInput && self.private.inputElement && self.private.mainElement && self.onChangeToInput) self.onChangeToInput(event, self);

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
