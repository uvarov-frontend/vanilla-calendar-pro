import type { HtmlElementPosition } from '@src/index';

/**
 * Get the offset position of an HTML element relative to the viewport.
 * @param {HTMLElement | null} element - The HTML element whose position is to be calculated.
 * @returns {HtmlElementPosition} An object containing the top, bottom, left, and right offset positions of the element.
 */

function getOffset(element?: HTMLElement | null): HtmlElementPosition {
  if (!element || !element.getBoundingClientRect) return { top: 0, bottom: 0, left: 0, right: 0 };

  const box = element.getBoundingClientRect();
  const docElem = document.documentElement;

  return {
    bottom: box.bottom,
    right: box.right,
    top: box.top + window.scrollY - docElem.clientTop,
    left: box.left + window.scrollX - docElem.clientLeft,
  };
}

export default getOffset;
