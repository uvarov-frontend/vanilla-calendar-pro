/**
 * Get the current scroll position of the window.
 * @returns {{ left: number, top: number }} An object containing the horizontal (left) and vertical (top) scroll positions.
 */

function getWindowScrollPosition(): { left: number; top: number } {
  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  const scrollX = typeof window !== 'undefined' ? window.scrollX : 0;

  return {
    left: scrollX || document.documentElement.scrollLeft || 0,
    top: scrollY || document.documentElement.scrollTop || 0,
  };
}

export default getWindowScrollPosition;
