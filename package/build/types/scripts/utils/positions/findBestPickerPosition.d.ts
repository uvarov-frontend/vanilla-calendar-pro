import type { Positions } from '@src/types';
/**
 * Determines the best position for displaying a calendar picker relative to an input element.
 * @param {HTMLInputElement} input - The input element.
 * @param {HTMLElement} calendar - The calendar picker modal.
 * @returns {Positions | Positions[]} The best position(s) for the calendar picker modal.
 */
declare function findBestPickerPosition(input: HTMLInputElement, calendar: HTMLElement): Positions | Positions[];
export default findBestPickerPosition;
