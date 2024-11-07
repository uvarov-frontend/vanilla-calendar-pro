import createYears from '@scripts/creators/createYears';
import handleMonth from '@scripts/handles/handleMonth';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const handleClickArrow = (self: Calendar, event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const arrowEl: HTMLElement | null = element.closest('[data-vc-arrow]');

  if (!arrowEl) return;

  if (['default', 'multiple'].includes(self.context.currentType)) {
    handleMonth(self, arrowEl.dataset.vcArrow as 'prev' | 'next');
  } else if (self.context.currentType === 'year' && self.context.displayYear !== undefined) {
    const offset = { prev: -15, next: 15 }[arrowEl.dataset.vcArrow as 'prev' | 'next'];
    setContext(self, 'displayYear', self.context.displayYear + offset);
    createYears(self, event.target as HTMLElement);
  }

  if (self.onClickArrow) self.onClickArrow(self, event);
};

export default handleClickArrow;
