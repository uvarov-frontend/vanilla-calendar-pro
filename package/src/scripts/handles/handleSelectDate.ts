import canToggleSelection from '@scripts/utils/canToggleSelection';
import setContext from '@scripts/utils/setContext';
import type { Calendar, FormatDateString } from '@src/index';

const handleSelectDate = (self: Calendar, dateEl: HTMLElement, multiple: boolean) => {
  const selectedDate = dateEl.dataset.vcDate as FormatDateString;
  const isSelected = dateEl.closest('[data-vc-date][data-vc-date-selected]');

  const isToggleAllowed = canToggleSelection(self);
  if (isSelected && !isToggleAllowed) return;

  const selectedDates = isSelected
    ? self.context.selectedDates.filter((date) => date !== selectedDate)
    : multiple
      ? [...self.context.selectedDates, selectedDate]
      : [selectedDate];
  setContext(self, 'selectedDates', selectedDates);
};

export default handleSelectDate;
