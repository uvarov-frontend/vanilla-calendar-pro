import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import state from '@scripts/handles/handleSelectDateRange/state';

const handleHoverSelectedDatesRangeEvent = (e: MouseEvent) => {
  const dateEl = (e.target as HTMLElement).closest<HTMLElement>('[data-vc-date-selected]');

  if (!dateEl && state.lastDateEl) {
    state.lastDateEl = null;
    createDateRangeTooltip(state.self!, state.tooltipEl, null);
    return;
  }

  if (!dateEl || state.lastDateEl === dateEl) return;
  state.lastDateEl = dateEl;
  createDateRangeTooltip(state.self!, state.tooltipEl, dateEl);
};

export default handleHoverSelectedDatesRangeEvent;
