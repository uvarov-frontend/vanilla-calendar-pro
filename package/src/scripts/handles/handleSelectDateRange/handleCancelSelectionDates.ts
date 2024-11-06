import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import { optimizedHandleHoverDatesEvent } from '@scripts/handles/handleSelectDateRange/optimizedHandles';
import state from '@scripts/handles/handleSelectDateRange/state';
import { removeHoverEffect } from '@scripts/handles/handleSelectDateRange/toggleHoverEffect';

const handleCancelSelectionDates = (e: KeyboardEvent) => {
  if (!state.self || e.key !== 'Escape') return;
  state.lastDateEl = null;
  state.self.private.selectedDates = [];
  state.self.private.mainElement!.removeEventListener('mousemove', optimizedHandleHoverDatesEvent);
  state.self.private.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);
  createDateRangeTooltip(state.self, state.tooltipEl, null);
  removeHoverEffect();
};

export default handleCancelSelectionDates;
