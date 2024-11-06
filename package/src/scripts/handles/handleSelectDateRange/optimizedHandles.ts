import handleHoverDatesEvent from '@scripts/handles/handleSelectDateRange/handleHoverDatesEvent';
import handleHoverSelectedDatesRangeEvent from '@scripts/handles/handleSelectDateRange/handleHoverSelectedDatesRangeEvent';
import state from '@scripts/handles/handleSelectDateRange/state';

const optimizedHoverHandler = (callback: (e: MouseEvent) => void) => {
  return (e: MouseEvent) => {
    if (!state.isHovering) {
      state.isHovering = true;
      requestAnimationFrame(() => {
        callback(e);
        state.isHovering = false;
      });
    }
  };
};

export const optimizedHandleHoverDatesEvent = optimizedHoverHandler(handleHoverDatesEvent);

export const optimizedHandleHoverSelectedDatesRangeEvent = optimizedHoverHandler(handleHoverSelectedDatesRangeEvent);
