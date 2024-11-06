import findBestPickerPosition from '@scripts/utils/positions/findBestPickerPosition';
import getOffset from '@scripts/utils/positions/getOffset';
import getViewportDimensions from '@scripts/utils/positions/getViewportDimensions';
import type { Calendar } from '@src/index';

/** Set the calendar picker position according to the user's choice coming from `positionToInput` option. */

const setPosition = (input: HTMLInputElement | undefined, calendar: HTMLElement, position: Calendar['positionToInput']) => {
  if (!input) return;
  const pos = position === 'auto' ? findBestPickerPosition(input, calendar) : position;

  const getPosition = {
    top: -calendar.offsetHeight,
    bottom: input.offsetHeight,
    left: 0,
    center: input.offsetWidth / 2 - calendar.offsetWidth / 2,
    right: input.offsetWidth - calendar.offsetWidth,
  };

  const YPosition = !Array.isArray(pos) ? 'bottom' : pos[0];
  const XPosition = !Array.isArray(pos) ? pos : pos[1];

  // add data attribute with Y position
  calendar.dataset.vcPosition = YPosition;

  const { top: offsetTop, left: offsetLeft } = getOffset(input);
  const top = offsetTop + getPosition[YPosition];
  let left = offsetLeft + getPosition[XPosition];

  // make sure the new position is not outside the viewport,
  // if so then change position to have enough space to show full picker
  const { vw } = getViewportDimensions();
  if (left + calendar.clientWidth > vw) {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    left = vw - calendar.clientWidth - scrollbarWidth;
  } else if (left < 0) {
    left = 0;
  }

  Object.assign(calendar.style, { left: `${left}px`, top: `${top}px` });
};

export default setPosition;
