import calculateAvailableSpace from '@scripts/utils/positions/calculateAvailableSpace';
import getOffset from '@scripts/utils/positions/getOffset';
import getViewportDimensions from '@scripts/utils/positions/getViewportDimensions';
import type { Positions } from '@src/index';

/**
 * Determines available positions for displaying a picker element relative to a parent element,
 * considering available space and margin offset.
 * @param {HTMLElement} parentElm - The input element.
 * @param {HTMLElement} pickerElm - The calendar picker modal.
 * @param {number} marginOffset - Margin offset applied when the picker is opened.
 * @returns {{ canShow: { top: boolean, bottom: boolean, left: boolean, right: boolean }, parentPositions: Positions[] }}
 * An object containing the possible display positions and parent element positions.
 */

function getAvailablePosition(parentElm: HTMLElement, pickerElm: HTMLElement, marginOffset = 5) {
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

  const positionMappings: Array<{ condition: boolean; position: Positions }> = [
    { condition: pickerOffsetTop < bodyCenterCoordinate.y, position: 'top' },
    { condition: pickerOffsetTop > bodyCenterCoordinate.y, position: 'bottom' },
    { condition: pickerOffsetLeft < bodyCenterCoordinate.x, position: 'left' },
    { condition: pickerOffsetLeft > bodyCenterCoordinate.x, position: 'right' },
  ];

  positionMappings.forEach(({ condition, position }) => {
    if (condition) parentPositions.push(position);
  });

  Object.assign(canShow, {
    top: pickerHeight <= spaceTop - marginOffset,
    bottom: pickerHeight <= spaceBottom - marginOffset,
    left: pickerWidth <= pickerOffsetLeft,
    right: pickerWidth <= vw - pickerOffsetLeft,
  });

  return { canShow, parentPositions };
}

export default getAvailablePosition;
