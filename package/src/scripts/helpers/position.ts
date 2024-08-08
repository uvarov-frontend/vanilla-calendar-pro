import { HtmlElementPosition, Positions } from '@package/types';

/**
 * Get the offset position of an HTML element relative to the viewport.
 * @param {HTMLElement | null} element - The HTML element whose position is to be calculated.
 * @returns {HtmlElementPosition} An object containing the top, bottom, left, and right offset positions of the element.
 */
export function getOffset(element?: HTMLElement | null): HtmlElementPosition {
	if (!element || !element.getBoundingClientRect) {
		return {
			top: 0, bottom: 0, left: 0, right: 0,
		};
	}

	const box = element.getBoundingClientRect();
	const docElem = document.documentElement;

	return {
		bottom: box.bottom,
		right: box.right,
		top: box.top + window.scrollY - docElem.clientTop,
		left: box.left + window.scrollX - docElem.clientLeft,
	};
}

/**
 * Get the current scroll position of the window.
 * @returns {{ left: number, top: number }} An object containing the horizontal (left) and vertical (top) scroll positions.
 */
export function getWindowScrollPosition(): { left: number; top: number; } {
	return {
		left: window.scrollX || document.documentElement.scrollLeft || 0,
		top: window.scrollY || document.documentElement.scrollTop || 0,
	};
}

/**
 * Get the dimensions of the viewport.
 * @returns {{ vw: number; vh: number; }} An object containing the viewport width (`vw`) and height (`vh`).
 */
export function getViewportDimensions() {
	return {
		vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
		vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
	};
}

/**
 * Calculates the available space for each side of the DOM element.
 * @param {HTMLElement} element - The DOM element to calculate space for.
 * @returns {{ top: number, bottom: number, left: number, right: number }} An object containing the available space on the top, bottom, left, and right sides of the element.
 */
export function calculateAvailableSpace(element: HTMLElement): { top: number; bottom: number; left: number; right: number; } {
	const { top: scrollTop, left: scrollLeft } = getWindowScrollPosition();
	const { top: elementTop, left: elementLeft } = getOffset(element);
	const { vh: viewportHeight, vw: viewportWidth } = getViewportDimensions();

	const elementOffsetTop = elementTop - scrollTop;
	const elementOffsetLeft = elementLeft - scrollLeft;

	return {
		top: elementOffsetTop,
		bottom: viewportHeight - (elementOffsetTop + element.clientHeight),
		left: elementOffsetLeft,
		right: viewportWidth - (elementOffsetLeft + element.clientWidth),
	};
}

/**
 * Determines available positions for displaying a picker element relative to a parent element,
 * considering available space and margin offset.
 * @param {HTMLElement} parentElm - The input element.
 * @param {HTMLElement} pickerElm - The calendar picker modal.
 * @param {number} marginOffset - Margin offset applied when the picker is opened.
 * @returns {{ canShow: { top: boolean, bottom: boolean, left: boolean, right: boolean }, parentPositions: Positions[] }}
 * An object containing the possible display positions and parent element positions.
 */
export function getAvailablePosition(parentElm: HTMLElement, pickerElm: HTMLElement, marginOffset = 5) {
	const canShow = {
		top: true,
		bottom: true,
		left: true,
		right: true,
	};
	const parentPositions: Positions[] = [];

	if (!pickerElm || !parentElm) return { canShow, parentPositions };

	const { bottom: spaceBottom, top: spaceTop } = calculateAvailableSpace(parentElm);
	const { top: pickerOffsetTop, left: pickerOffsetLeft } = getOffset(parentElm);
	const { height: pickerHeight, width: pickerWidth } = pickerElm.getBoundingClientRect();
	const { vh, vw } = getViewportDimensions();
	const bodyCenterCoordinate = { x: vw / 2, y: vh / 2 };

	const positionMappings: Array<{ condition: boolean, position: Positions }> = [
		{ condition: pickerOffsetTop < bodyCenterCoordinate.y, position: 'top' },
		{ condition: pickerOffsetTop > bodyCenterCoordinate.y, position: 'bottom' },
		{ condition: pickerOffsetLeft < bodyCenterCoordinate.x, position: 'left' },
		{ condition: pickerOffsetLeft > bodyCenterCoordinate.x, position: 'right' },
	];

	positionMappings.forEach(({ condition, position }) => {
		if (condition) parentPositions.push(position);
	});

	Object.assign(canShow, {
		top: pickerHeight <= (spaceTop - marginOffset),
		bottom: pickerHeight <= (spaceBottom - marginOffset),
		left: pickerWidth <= pickerOffsetLeft,
		right: pickerWidth <= (vw - pickerOffsetLeft),
	});

	return { canShow, parentPositions };
}

/**
 * Determines the best position for displaying a calendar picker relative to an input element.
 * @param {HTMLInputElement} input - The input element.
 * @param {HTMLElement} calendar - The calendar picker modal.
 * @returns {Positions | Positions[]} The best position(s) for the calendar picker modal.
 */
export function findBestPickerPosition(input: HTMLInputElement, calendar: HTMLElement): Positions | Positions[] {
	const position: Positions | Positions[] = 'left';

	if (!calendar || !input) return position;

	const { canShow, parentPositions } = getAvailablePosition(input, calendar);
	const isCenterPosition = canShow.left && canShow.right;

	const bestPosition: Positions | Positions[] = isCenterPosition && canShow.bottom ? 'center'
		: isCenterPosition && canShow.top ? ['top', 'center']
			: Array.isArray(parentPositions) ? [parentPositions[0] === 'bottom' ? 'top' : 'bottom', ...parentPositions.slice(1)]
				: parentPositions;

	return bestPosition || position;
}
