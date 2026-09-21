import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import getRangeState from '@scripts/handles/handleSelectDateRange/state';
import type { Calendar } from '@src/index';

const handleHoverSelectedDatesRangeEvent = (self: Calendar, target: HTMLElement | null) => {
  const state = getRangeState(self);
  if (self.context.mainElement.hasAttribute('data-vc-dragging')) return;
  const dateEl = target?.closest<HTMLElement>('[data-vc-date-selected]');

  if (!dateEl && state.lastDateEl) {
    state.lastDateEl = null;
    createDateRangeTooltip(self, state.tooltipEl, null);
    return;
  }

  if (!dateEl || state.lastDateEl === dateEl) return;
  state.lastDateEl = dateEl;
  createDateRangeTooltip(self, state.tooltipEl, dateEl);
};

export default handleHoverSelectedDatesRangeEvent;
