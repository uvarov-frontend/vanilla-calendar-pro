import getOffset from '@scripts/utils/positions/getOffset';
import getViewportDimensions from '@scripts/utils/positions/getViewportDimensions';
import getWindowScrollPosition from '@scripts/utils/positions/getWindowScrollPosition';

/**
 * Calculates the available space for each side of the DOM element.
 * @param {HTMLElement} element - The DOM element to calculate space for.
 * @returns {{ top: number, bottom: number, left: number, right: number }} An object containing the available space on the top, bottom, left, and right sides of the element.
 */

function calculateAvailableSpace(element: HTMLElement): { top: number; bottom: number; left: number; right: number } {
  const { top: scrollTop, left: scrollLeft } = getWindowScrollPosition();
  const { top: elementTop, left: elementLeft } = getOffset(element);
  const { vh: viewportHeight, vw: viewportWidth } = getViewportDimensions();

  const elementOffsetTop = elementTop - scrollTop;
  const elementOffsetLeft = elementLeft - scrollLeft;

  return {
    top: elementOffsetTop,
    bottom: viewportHeight - (elementOffsetTop + element.clientHeight),
    left: elementOffsetLeft,
    right: viewportWidth - (elementOffsetLeft + element.clientWidth),
  };
}

export default calculateAvailableSpace;
