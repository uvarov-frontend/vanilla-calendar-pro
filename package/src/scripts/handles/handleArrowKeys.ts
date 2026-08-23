import { focusRovingItem } from '@scripts/utils/rovingTabIndex';
import type { Calendar } from '@src/index';

const handleArrowKeys = (self: Calendar) => {
  type Grid = { container: string; row: string; item: string };
  const grids: Grid[] = [
    { container: '[data-vc="dates"]', row: '[data-vc-dates="row"]', item: '[data-vc-date-btn]' },
    { container: '[data-vc="months"]', row: '[data-vc-months="row"]', item: '[data-vc-months-month]' },
    { container: '[data-vc="years"]', row: '[data-vc-years="row"]', item: '[data-vc-years-year]' },
  ];

  const isEnabled = (button: HTMLButtonElement) => !button.disabled && button.getAttribute('aria-disabled') !== 'true';

  const getVerticalTarget = (gridEl: HTMLElement, grid: Grid, button: HTMLButtonElement, direction: -1 | 1) => {
    const currentRow = button.closest<HTMLElement>(grid.row);
    if (!currentRow) return button;

    const rows = Array.from(gridEl.querySelectorAll<HTMLElement>(grid.row));
    const rowIndex = rows.indexOf(currentRow);
    const columnIndex = Array.from(currentRow.children).indexOf(button.parentElement as Element);
    const targetRow = rows[rowIndex + direction];
    const target = targetRow?.children[columnIndex]?.querySelector<HTMLButtonElement>(grid.item);

    return target && isEnabled(target) ? target : button;
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!target || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;

    const grid = grids.find((item) => target.matches(item.item));
    const gridEl = grid ? target.closest<HTMLElement>(grid.container) : null;
    if (!grid || !gridEl || gridEl.closest('[data-vc-ghost]')) return;

    const buttons = Array.from(gridEl.querySelectorAll<HTMLButtonElement>(grid.item)).filter(isEnabled);
    const currentIndex = buttons.indexOf(target as HTMLButtonElement);
    if (currentIndex === -1) return;

    const nextButton = {
      ArrowUp: () => getVerticalTarget(gridEl, grid, target, -1),
      ArrowDown: () => getVerticalTarget(gridEl, grid, target, 1),
      ArrowLeft: () => buttons[Math.max(0, currentIndex - 1)],
      ArrowRight: () => buttons[Math.min(buttons.length - 1, currentIndex + 1)],
    }[event.key]!;

    // Arrow keys move within their grid and must not scroll the page along with them.
    event.preventDefault();
    nextButton()?.focus();
  };

  self.context.mainElement.addEventListener('keydown', onKeyDown);
  self.context.mainElement.addEventListener('focusin', focusRovingItem);

  return () => {
    self.context.mainElement.removeEventListener('keydown', onKeyDown);
    self.context.mainElement.removeEventListener('focusin', focusRovingItem);
  };
};

export default handleArrowKeys;
