import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import state from '@scripts/handles/handleSelectDateRange/state';

const isDragging = () => !!state.self?.context?.mainElement?.hasAttribute('data-vc-dragging');

const handleHoverSelectedDatesRangeEvent = (target: HTMLElement | null) => {
  if (isDragging()) return;
  const dateEl = target?.closest<HTMLElement>('[data-vc-date-selected]');

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
