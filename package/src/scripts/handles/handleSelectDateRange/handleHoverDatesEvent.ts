import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import getRangeState from '@scripts/handles/handleSelectDateRange/state';
import { removeHoverEffect } from '@scripts/handles/handleSelectDateRange/toggleHoverEffect';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type { Calendar, FormatDateString } from '@src/index';

const handleHoverDatesEvent = (self: Calendar, target: HTMLElement | null) => {
  const state = getRangeState(self);
  if (self.context.mainElement.hasAttribute('data-vc-dragging') || !target || !self?.context?.selectedDates[0]) return;

  if (!target.closest('[data-vc="dates"]')) {
    state.lastDateEl = null;
    createDateRangeTooltip(self, state.tooltipEl, null);
    removeHoverEffect(self);
    return;
  }

  const dateEl = target.closest<HTMLElement>('[data-vc-date]');
  if (!dateEl || state.lastDateEl === dateEl) return;

  state.lastDateEl = dateEl;
  createDateRangeTooltip(self, state.tooltipEl, dateEl);
  removeHoverEffect(self);

  const lastDateString = dateEl.dataset.vcDate as FormatDateString;
  const startDate = getDate(self.context.selectedDates[0]);
  const endDate = getDate(lastDateString);

  const [start, end] = startDate < endDate ? [startDate, endDate] : [endDate, startDate];
  const [first, last] = startDate < endDate ? [self.context.selectedDates[0], lastDateString] : [lastDateString, self.context.selectedDates[0]];
  const disabled = new Set(self.context.disableDates);

  // Keep the endpoint behavior even when an endpoint is disabled: the old
  // loop marked both ends if at least one day in the interval was enabled.
  const enabledDate = new Date(start);
  while (enabledDate <= end && disabled.has(getDateString(enabledDate))) enabledDate.setDate(enabledDate.getDate() + 1);
  if (!(enabledDate <= end)) return;

  self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc-date]').forEach((cell) => {
    const date = cell.dataset.vcDate as FormatDateString;
    if (date === first || date === last) {
      cell.dataset.vcDateHover = first === last ? 'first-and-last' : date === first ? 'first' : 'last';
    } else {
      const time = getDate(date);
      if (time >= start && time <= end && !disabled.has(date)) cell.dataset.vcDateHover = '';
    }
  });
};

export default handleHoverDatesEvent;
