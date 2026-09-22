import handleHoverDatesEvent from '@scripts/handles/handleSelectDateRange/handleHoverDatesEvent';
import getRangeState from '@scripts/handles/handleSelectDateRange/state';
import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

const optimizedHoverHandler = (self: Calendar) => (event: MouseEvent) => {
  if (!self.context.selectedDates[0] || (self.context.selectedDates.length !== 1 && !self.onCreateDateRangeTooltip)) return;
  const state = getRangeState(self);
  if (state.isHovering) return;
  const target = event.target as HTMLElement;
  state.isHovering = true;
  state.frameId = requestAnimationFrame(() => {
    state.frameId = null;
    state.isHovering = false;
    if (self.context.isDestroyed || !self.context.mainElement.contains(target)) return;
    if (self.context.selectedDates.length === 1) handleHoverDatesEvent(self, target);
    else if (self.context.selectedDates[0] && !!self.onCreateDateRangeTooltip) getExtensions(self).annotations?.hover(self, target);
  });
};

export default optimizedHoverHandler;
