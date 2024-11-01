/**
 * Get the current scroll position of the window.
 * @returns {{ left: number, top: number }} An object containing the horizontal (left) and vertical (top) scroll positions.
 */
declare function getWindowScrollPosition(): {
    left: number;
    top: number;
};
export default getWindowScrollPosition;
