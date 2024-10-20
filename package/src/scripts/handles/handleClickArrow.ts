import changeMonth from '@scripts/modules/changeMonth';
import createYears from '@scripts/modules/createYears';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleClickArrow = (self: VanillaCalendar, event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const arrowEl: HTMLElement | null = element.closest('[data-vc="arrow-prev"], [data-vc="arrow-next"]');

  if (!arrowEl) return;

  const direction = (arrowEl.dataset.vc as string).split('-')[1] as 'prev' | 'next';

  if (['default', 'multiple'].includes(self.currentType)) {
    changeMonth(self, direction);
  } else if (self.currentType === 'year' && self.viewYear !== undefined) {
    self.viewYear += { prev: -15, next: 15 }[direction];
    createYears(self, event.target as HTMLElement);
  }

  if (self.actions.clickArrow) self.actions.clickArrow(event, self);
};

export default handleClickArrow;
