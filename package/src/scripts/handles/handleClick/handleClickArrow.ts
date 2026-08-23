import handleNavigate, { type Route } from '@scripts/handles/handleNavigate';
import type { Calendar } from '@src/index';

const handleClickArrow = (self: Calendar, event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const arrowEl: HTMLElement | null = element.closest('[data-vc-arrow]');

  if (!arrowEl) return;

  handleNavigate(self, arrowEl.dataset.vcArrow as Route, element);

  if (self.onClickArrow) self.onClickArrow(self, event);
};

export default handleClickArrow;
