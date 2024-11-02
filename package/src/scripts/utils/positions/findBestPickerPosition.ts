import getAvailablePosition from '@scripts/utils/positions/getAvailablePosition';
import type { Positions } from '@src/index';

/**
 * Determines the best position for displaying a calendar picker relative to an input element.
 * @param {HTMLInputElement} input - The input element.
 * @param {HTMLElement} calendar - The calendar picker modal.
 * @returns {Positions | Positions[]} The best position(s) for the calendar picker modal.
 */

function findBestPickerPosition(input: HTMLInputElement, calendar: HTMLElement): Positions | Positions[] {
  const position: Positions | Positions[] = 'left';

  if (!calendar || !input) return position;

  const { canShow, parentPositions } = getAvailablePosition(input, calendar);
  const isCenterPosition = canShow.left && canShow.right;

  const bestPosition: Positions | Positions[] =
    isCenterPosition && canShow.bottom
      ? 'center'
      : isCenterPosition && canShow.top
        ? ['top', 'center']
        : Array.isArray(parentPositions)
          ? [parentPositions[0] === 'bottom' ? 'top' : 'bottom', ...parentPositions.slice(1)]
          : parentPositions;

  return bestPosition || position;
}

export default findBestPickerPosition;
