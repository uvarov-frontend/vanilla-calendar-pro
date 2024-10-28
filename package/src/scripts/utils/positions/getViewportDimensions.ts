/**
 * Get the dimensions of the viewport.
 * @returns {{ vw: number; vh: number; }} An object containing the viewport width (`vw`) and height (`vh`).
 */

function getViewportDimensions() {
  return {
    vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  };
}

export default getViewportDimensions;
