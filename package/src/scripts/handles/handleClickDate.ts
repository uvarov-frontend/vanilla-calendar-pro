import type { FormatDateString } from '@package/types';
import handleDateRangedSelection from '@scripts/handles/handleDateRangedSelection';
import handleDateSelection from '@scripts/handles/handleDateSelection';
import changeMonth from '@scripts/modules/changeMonth';
import createDates from '@scripts/modules/createDates/createDates';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleClickDate = (self: VanillaCalendar, event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const dateBtnEl = element.closest<HTMLButtonElement>('[data-vc-date-btn]');

  if (!self.settings.selection.day || !['single', 'multiple', 'multiple-ranged'].includes(self.settings.selection.day) || !dateBtnEl) return;

  const dateEl = dateBtnEl.closest('[data-vc-date]') as HTMLElement;
  const daySelectionActions = {
    single: () => handleDateSelection(self, dateEl, false),
    multiple: () => handleDateSelection(self, dateEl, true),
    'multiple-ranged': () => handleDateRangedSelection(self, dateEl.dataset.vcDate as FormatDateString),
  };
  daySelectionActions[self.settings.selection.day]();
  self.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));

  if (self.actions.clickDay) self.actions.clickDay(event, self);

  const isInitAsInput = self.input && self.HTMLInputElement && self.HTMLElement;
  if (isInitAsInput && self.actions.changeToInput) {
    self.actions.changeToInput(event, self);
  }

  const dayPrevEl = element.closest('[data-vc-date="prev"]');
  const dayNextEl = element.closest('[data-vc-date="next"]');

  const actionMapping = {
    prev: () => changeMonth(self, 'prev'),
    next: () => changeMonth(self, 'next'),
    current: () => createDates(self),
  };

  actionMapping[dayPrevEl ? 'prev' : dayNextEl ? 'next' : 'current']();
};

export default handleClickDate;
