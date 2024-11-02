/**
 * Get the dimensions of the viewport.
 * @returns {{ vw: number; vh: number; }} An object containing the viewport width (`vw`) and height (`vh`).
 */

function getViewportDimensions() {
  const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  return {
    vw: Math.max(document.documentElement.clientWidth || 0, innerWidth),
    vh: Math.max(document.documentElement.clientHeight || 0, innerHeight),
  };
}

export default getViewportDimensions;
