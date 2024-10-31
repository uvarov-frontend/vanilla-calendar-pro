import type { FormatDateString } from '@package/types';
import canToggleSelection from '@scripts/utils/canToggleSelection';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleSelectDate = (self: VanillaCalendar, dateEl: HTMLElement, multiple: boolean) => {
  const selectedDate = dateEl.dataset.vcDate as FormatDateString;
  const isSelected = dateEl.closest('[data-vc-date][data-vc-date-selected]');

  const isToggleAllowed = canToggleSelection(self);
  if (isSelected && !isToggleAllowed) return;

  self.private.selectedDates = isSelected
    ? self.private.selectedDates.filter((date) => date !== selectedDate)
    : multiple
      ? [...self.private.selectedDates, selectedDate]
      : [selectedDate];
};

export default handleSelectDate;
