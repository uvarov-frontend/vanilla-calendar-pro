import { CSSClasses, IVisibility, HtmlElementPosition } from '@/package/types';

type Position = 'center' | 'left' | 'right';
type PositionList = ['bottom' | 'top', 'center' | 'left' | 'right'];

/** Get HTML element offset with pure JS */
export function getOffset(elm?: HTMLElement | null): HtmlElementPosition | undefined {
	if (!elm || !elm.getBoundingClientRect) {
		return undefined;
	}
	const box = elm.getBoundingClientRect();
	const docElem = document.documentElement;

	return {
		bottom: box.bottom,
		right: box.right,
		top: box.top + window.pageYOffset - docElem.clientTop,
		left: box.left + window.pageXOffset - docElem.clientLeft,
	};
}

/**
 * Get the Window Scroll top/left Position
 * @returns
 */
export function windowScrollPosition(): { left: number; top: number; } {
	return {
		left: window.pageXOffset || document.documentElement.scrollLeft || 0,
		top: window.pageYOffset || document.documentElement.scrollTop || 0,
	};
}

export function getViewportDimensions() {
	return {
		vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
		vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
	};
}

/** calculate available space for each side of the DOM element */
export function calculateAvailableSpace(element: HTMLElement): { top: number; bottom: number; left: number; right: number; } {
	let bottom = 0;
	let top = 0;
	let left = 0;
	let right = 0;

	const scrollPosition = windowScrollPosition();
	const elmOffset = getOffset(element);
	const { vh, vw } = getViewportDimensions();
	const pageScrollTop = scrollPosition.top;
	const pageScrollLeft = scrollPosition.left;

	if (elmOffset) {
		const elementOffsetTop = elmOffset.top ?? 0;
		const elementOffsetLeft = elmOffset.left ?? 0;
		top = elementOffsetTop - pageScrollTop;
		left = elementOffsetLeft - pageScrollLeft;
		bottom = vh - (elementOffsetTop - pageScrollTop + element.clientHeight);
		right = vw - (elementOffsetLeft - pageScrollLeft + element.clientWidth);
	}

	return { top, bottom, left, right };
}

/**
 * Get all available positions calculated by available space,
 * e.g.: { canShow: { top: true, bottom: false, ...}, parentPositions: ['top', 'center'] }
 * @param parentElm - parent element (input)
 * @param pickerElm - picker element (calendar picker modal)
 * @param marginOffset - margin offset when picker is opened
 * @returns
 */
export function getAvailablePosition(parentElm: HTMLElement, pickerElm: HTMLElement, marginOffset = 5) {
	const canShow = { top: true, bottom: true, left: true, right: true };
	const parentPositions: PositionList = [] as unknown as PositionList;

	if (pickerElm && parentElm) {
		const { bottom: spaceBottom, top: spaceTop } = calculateAvailableSpace(parentElm);
		const { top: pickerOffsetTop, left: pickerOffsetLeft } = getOffset(parentElm) as HtmlElementPosition;
		const { height: pickerHeight, width: pickerWidth } = pickerElm.getBoundingClientRect();
		const { vh, vw } = getViewportDimensions();
		const bodyCenterCoordinate = { x: vw / 2, y: vh / 2 };

		if (pickerOffsetTop < bodyCenterCoordinate.y) {
			parentPositions.push('top');
		}
		if (pickerOffsetTop > bodyCenterCoordinate.y) {
			parentPositions.push('bottom');
		}
		if (pickerOffsetLeft < bodyCenterCoordinate.x) {
			parentPositions.push('left');
		}
		if (pickerOffsetLeft > bodyCenterCoordinate.x) {
			parentPositions.push('right');
		}

		if (pickerHeight > (spaceTop - marginOffset)) {
			canShow.top = false;
		}
		if (pickerHeight > (spaceBottom - marginOffset)) {
			canShow.bottom = false;
		}
		if (pickerWidth > pickerOffsetLeft) {
			canShow.left = false;
		}
		if ((vw - pickerOffsetLeft) < pickerWidth) {
			canShow.right = false;
		}
	}

	return { canShow, parentPositions };
}

export function findBestPickerPosition(input: HTMLInputElement, calendar: HTMLElement): Position | PositionList {
	let position: Position | PositionList = 'left';
	if (calendar && input) {
		const { canShow, parentPositions } = getAvailablePosition(input, calendar);

		if (canShow.left && canShow.right) {
			if (canShow.bottom) {
				position = 'center';
			} else if (canShow.top) {
				position = ['top', 'center'];
			}
		} else {
			if (Array.isArray(parentPositions)) {
				parentPositions[0] = (parentPositions[0] === 'bottom') ? 'top' : 'bottom';
				return parentPositions;
			}
			return parentPositions;
		}
	}

	return position;
}

export const setPositionCalendar = (input: HTMLInputElement | undefined, calendar: HTMLElement, position: IVisibility['positionToInput'], css: CSSClasses) => {
	if (input) {
		const pos = position === 'auto'
			? findBestPickerPosition(input, calendar)
			: position;

		const getPosition = {
			top: -calendar.offsetHeight,
			bottom: input.offsetHeight,
			left: 0,
			center: input.offsetWidth / 2 - calendar.offsetWidth / 2,
			right: input.offsetWidth - calendar.offsetWidth,
		};

		const YPosition = !Array.isArray(pos) ? 'bottom' : pos[0];
		const XPosition = !Array.isArray(pos) ? pos : pos[1];

		calendar.classList.add(YPosition === 'bottom' ? css.calendarToInputBottom : css.calendarToInputTop);

		const inputRect = input.getBoundingClientRect();
		const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
		const scrollTop = window.scrollY || document.documentElement.scrollTop;

		const top = inputRect.top + scrollTop + getPosition[YPosition];
		const left = inputRect.left + scrollLeft + getPosition[XPosition];

		Object.assign(calendar.style, { left: `${left}px`, top: `${top}px` });
	}
};
