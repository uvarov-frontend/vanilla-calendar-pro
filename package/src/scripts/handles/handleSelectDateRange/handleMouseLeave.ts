import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import getRangeState from '@scripts/handles/handleSelectDateRange/state';
import { removeHoverEffect } from '@scripts/handles/handleSelectDateRange/toggleHoverEffect';
import type { Calendar } from '@src/index';

const handleMouseLeave = (self: Calendar) => {
  const state = getRangeState(self);
  if (state.timeoutId !== null) clearTimeout(state.timeoutId);

  state.timeoutId = setTimeout(() => {
    state.timeoutId = null;
    if (self.context.isDestroyed) return;
    state.lastDateEl = null;
    createDateRangeTooltip(self, state.tooltipEl, null);
    removeHoverEffect(self);
  }, 50);
};

export default handleMouseLeave;
