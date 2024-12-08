import handleMonthFast from '@scripts/handles/handleMonthFast';
import type { Calendar } from '@src/index';

const handleClickArrowFast = (self: Calendar, event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const arrowEl: HTMLElement | null = element.closest('[data-vc-arrow-fast]');

  if (!arrowEl) return;

  if (['multiple'].includes(self.context.currentType)) {
    handleMonthFast(self, arrowEl.dataset.vcArrowFast as 'prev' | 'next');
  } else {
    return;
  }

  if (self.onClickArrowFast) self.onClickArrowFast(self, event);
};

export default handleClickArrowFast;
