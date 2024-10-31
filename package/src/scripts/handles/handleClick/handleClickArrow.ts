import createYears from '@scripts/creators/createYears';
import handleMonth from '@scripts/handles/handleMonth';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleClickArrow = (self: VanillaCalendar, event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const arrowEl: HTMLElement | null = element.closest('[data-vc-arrow]');

  if (!arrowEl) return;

  if (['default', 'multiple'].includes(self.private.currentType)) {
    handleMonth(self, arrowEl.dataset.vcArrow as 'prev' | 'next');
  } else if (self.private.currentType === 'year' && self.private.displayYear !== undefined) {
    self.private.displayYear += { prev: -15, next: 15 }[arrowEl.dataset.vcArrow as 'prev' | 'next'];
    createYears(self, event.target as HTMLElement);
  }

  if (self.actions.clickArrow) self.actions.clickArrow(event, self);
};

export default handleClickArrow;
