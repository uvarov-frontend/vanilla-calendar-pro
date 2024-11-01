import type { Positions } from '@src/types';
/**
 * Determines available positions for displaying a picker element relative to a parent element,
 * considering available space and margin offset.
 * @param {HTMLElement} parentElm - The input element.
 * @param {HTMLElement} pickerElm - The calendar picker modal.
 * @param {number} marginOffset - Margin offset applied when the picker is opened.
 * @returns {{ canShow: { top: boolean, bottom: boolean, left: boolean, right: boolean }, parentPositions: Positions[] }}
 * An object containing the possible display positions and parent element positions.
 */
declare function getAvailablePosition(parentElm: HTMLElement, pickerElm: HTMLElement, marginOffset?: number): {
    canShow: {
        top: boolean;
        bottom: boolean;
        left: boolean;
        right: boolean;
    };
    parentPositions: Positions[];
};
export default getAvailablePosition;
