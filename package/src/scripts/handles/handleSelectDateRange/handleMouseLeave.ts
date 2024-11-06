import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import state from '@scripts/handles/handleSelectDateRange/state';
import { removeHoverEffect } from '@scripts/handles/handleSelectDateRange/toggleHoverEffect';

const handleMouseLeave = () => {
  if (state.timeoutId !== null) clearTimeout(state.timeoutId);

  state.timeoutId = setTimeout(() => {
    state.lastDateEl = null;
    createDateRangeTooltip(state.self!, state.tooltipEl, null);
    removeHoverEffect();
  }, 50);
};

export default handleMouseLeave;
