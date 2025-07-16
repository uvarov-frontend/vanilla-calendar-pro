import handleHoverDatesEvent from '@scripts/handles/handleSelectDateRange/handleHoverDatesEvent';
import handleHoverSelectedDatesRangeEvent from '@scripts/handles/handleSelectDateRange/handleHoverSelectedDatesRangeEvent';
import state from '@scripts/handles/handleSelectDateRange/state';

const optimizedHoverHandler = (callback: (target: HTMLElement | null) => void) => {
  return (e: MouseEvent) => {
    const closuredTarget = e.target as HTMLElement;
    if (!state.isHovering) {
      state.isHovering = true;
      requestAnimationFrame(() => {
        callback(closuredTarget);
        state.isHovering = false;
      });
    }
  };
};

export const optimizedHandleHoverDatesEvent = optimizedHoverHandler(handleHoverDatesEvent);

export const optimizedHandleHoverSelectedDatesRangeEvent = optimizedHoverHandler(handleHoverSelectedDatesRangeEvent);
