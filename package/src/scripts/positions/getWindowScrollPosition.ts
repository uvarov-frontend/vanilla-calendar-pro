/**
 * Get the current scroll position of the window.
 * @returns {{ left: number, top: number }} An object containing the horizontal (left) and vertical (top) scroll positions.
 */

function getWindowScrollPosition(): { left: number; top: number } {
  return {
    left: window.scrollX || document.documentElement.scrollLeft || 0,
    top: window.scrollY || document.documentElement.scrollTop || 0,
  };
}

export default getWindowScrollPosition;
