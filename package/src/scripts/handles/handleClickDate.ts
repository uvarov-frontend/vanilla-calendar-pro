import type { FormatDateString, WeekDayID } from '@package/types';
import setDateModifier from '@scripts/creators/createDates/setDateModifier';
import handleMonth from '@scripts/handles/handleMonth';
import handleSelectDate from '@scripts/handles/handleSelectDate';
import handleSelectDateRanged from '@scripts/handles/handleSelectDateRange';
import getDate from '@scripts/helpers/getDate';
import type VanillaCalendar from '@src/vanilla-calendar';

const updateDateModifier = (self: VanillaCalendar) => {
  const dateEls = self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc-date]');
  dateEls.forEach((dateEl) => {
    const dateStr = dateEl.dataset.vcDate as FormatDateString;
    const dayWeekID = getDate(dateStr).getDay() as WeekDayID;
    setDateModifier(self, self.selectedYear, dateEl, dayWeekID, dateStr, 'current');
  });
};

const handleClickDate = (self: VanillaCalendar, event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const dateBtnEl = element.closest<HTMLButtonElement>('[data-vc-date-btn]');

  if (!self.settings.selection.day || !['single', 'multiple', 'multiple-ranged'].includes(self.settings.selection.day) || !dateBtnEl) return;

  const dateEl = dateBtnEl.closest('[data-vc-date]') as HTMLElement;
  const daySelectionActions = {
    single: () => handleSelectDate(self, dateEl, false),
    multiple: () => handleSelectDate(self, dateEl, true),
    'multiple-ranged': () => handleSelectDateRanged(self, dateEl.dataset.vcDate as FormatDateString),
  };
  daySelectionActions[self.settings.selection.day]();
  self.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));

  if (self.actions.clickDay) self.actions.clickDay(event, self);

  const isInitAsInput = self.input && self.HTMLInputElement && self.HTMLElement;
  if (isInitAsInput && self.actions.changeToInput) {
    self.actions.changeToInput(event, self);
  }

  const dayPrevEl = element.closest('[data-vc-date-month="prev"]');
  const dayNextEl = element.closest('[data-vc-date-month="next"]');

  const actionMapping = {
    prev: () => (self.switchMonthForDate ? handleMonth(self, 'prev') : updateDateModifier(self)),
    next: () => (self.switchMonthForDate ? handleMonth(self, 'next') : updateDateModifier(self)),
    current: () => updateDateModifier(self),
  };

  actionMapping[dayPrevEl ? 'prev' : dayNextEl ? 'next' : 'current']();
};

export default handleClickDate;
