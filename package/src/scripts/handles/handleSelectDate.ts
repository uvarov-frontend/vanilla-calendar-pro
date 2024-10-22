import type { FormatDateString } from '@package/types';
import type VanillaCalendar from '@src/vanilla-calendar';

const canToggleSelection = (self: VanillaCalendar): boolean => {
  if (self.toggleSelected !== undefined) {
    return typeof self.toggleSelected === 'function' ? self.toggleSelected(self) : self.toggleSelected;
  }
  return true;
};

const handleSelectDate = (self: VanillaCalendar, dateEl: HTMLElement, multiple: boolean) => {
  const selectedDate = dateEl.dataset.vcDate as FormatDateString;
  const isSelected = dateEl.closest('[data-vc-date][aria-selected]');

  if (isSelected && !self.settings.selection.cancelableDay) return;

  const isToggleAllowed = canToggleSelection(self);
  if (isSelected && !isToggleAllowed) return;

  self.selectedDates = isSelected
    ? self.selectedDates.filter((date) => date !== selectedDate)
    : multiple
      ? [...self.selectedDates, selectedDate]
      : [selectedDate];
};

export default handleSelectDate;
