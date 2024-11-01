/**
 * Calculates the available space for each side of the DOM element.
 * @param {HTMLElement} element - The DOM element to calculate space for.
 * @returns {{ top: number, bottom: number, left: number, right: number }} An object containing the available space on the top, bottom, left, and right sides of the element.
 */
declare function calculateAvailableSpace(element: HTMLElement): {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
export default calculateAvailableSpace;
