import canToggleSelection from '@scripts/utils/canToggleSelection';
import type { FormatDateString, VanillaCalendarPro } from '@src/index';

const handleSelectDate = (self: VanillaCalendarPro, dateEl: HTMLElement, multiple: boolean) => {
  const selectedDate = dateEl.dataset.vcDate as FormatDateString;
  const isSelected = dateEl.closest('[data-vc-date][data-vc-date-selected]');

  const isToggleAllowed = canToggleSelection(self);
  if (isSelected && !isToggleAllowed) return;

  self.context.selectedDates = isSelected
    ? self.context.selectedDates.filter((date) => date !== selectedDate)
    : multiple
      ? [...self.context.selectedDates, selectedDate]
      : [selectedDate];
};

export default handleSelectDate;
