import type { Calendar } from '@src/index';

type Group = { container: string; item: string; active: string[] };

// A grid is a single tab stop: the arrow keys reach the rest of its cells.
const groups: Group[] = [
  {
    container: '[data-vc="dates"]',
    item: '[data-vc-date-btn]',
    active: ['[data-vc-date-selected] [data-vc-date-btn]', '[data-vc-date-today] [data-vc-date-btn]'],
  },
  { container: '[data-vc="months"]', item: '[data-vc-months-month]', active: ['[data-vc-months-month-selected]'] },
  { container: '[data-vc="years"]', item: '[data-vc-years-year]', active: ['[data-vc-years-year-selected]'] },
];

const isEnabled = (el: HTMLElement) => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true';

const getActiveItem = (containerEl: HTMLElement, group: Group, items: HTMLElement[]) => {
  const preferred = group.active.map((selector) => containerEl.querySelector<HTMLElement>(selector)).find((el): el is HTMLElement => !!el && isEnabled(el));
  return preferred ?? items.find(isEnabled) ?? items[0];
};

const setRovingItem = (containerEl: HTMLElement, group: Group, activeEl: HTMLElement | null) => {
  const items = Array.from(containerEl.querySelectorAll<HTMLElement>(group.item));
  if (!items[0]) return;
  const active = activeEl && isEnabled(activeEl) ? activeEl : getActiveItem(containerEl, group, items);
  items.forEach((item) => {
    item.tabIndex = item === active ? 0 : -1;
  });
};

export const focusRovingItem = (event: FocusEvent) => {
  const target = event.target as HTMLElement;
  const group = groups.find((item) => target.matches?.(item.item));
  const containerEl = group ? target.closest<HTMLElement>(group.container) : null;
  if (group && containerEl) setRovingItem(containerEl, group, target);
};

const updateRovingTabIndex = (self: Calendar) => {
  groups.forEach((group) => {
    self.context.mainElement.querySelectorAll<HTMLElement>(group.container).forEach((containerEl) => {
      if (containerEl.closest('[data-vc-ghost]')) return;
      setRovingItem(containerEl, group, null);
    });
  });
};

export default updateRovingTabIndex;
