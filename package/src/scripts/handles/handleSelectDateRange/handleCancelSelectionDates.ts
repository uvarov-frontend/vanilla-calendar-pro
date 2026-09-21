import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import getRangeState from '@scripts/handles/handleSelectDateRange/state';
import { removeHoverEffect } from '@scripts/handles/handleSelectDateRange/toggleHoverEffect';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const handleCancelSelectionDates = (self: Calendar, event: KeyboardEvent) => {
  if (event.key !== 'Escape' || self.context.selectedDates.length !== 1) return;
  const state = getRangeState(self);
  state.lastDateEl = null;
  setContext(self, 'selectedDates', []);
  createDateRangeTooltip(self, state.tooltipEl, null);
  removeHoverEffect(self);
};

export default handleCancelSelectionDates;
