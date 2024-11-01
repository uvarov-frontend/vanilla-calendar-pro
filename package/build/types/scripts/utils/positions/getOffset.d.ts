import { HtmlElementPosition } from '../../../types';
/**
 * Get the offset position of an HTML element relative to the viewport.
 * @param {HTMLElement | null} element - The HTML element whose position is to be calculated.
 * @returns {HtmlElementPosition} An object containing the top, bottom, left, and right offset positions of the element.
 */
declare function getOffset(element?: HTMLElement | null): HtmlElementPosition;
export default getOffset;
