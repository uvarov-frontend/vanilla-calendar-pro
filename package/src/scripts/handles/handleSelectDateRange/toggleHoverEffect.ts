import type { Calendar } from '@src/index';

export const removeHoverEffect = (self: Calendar) => {
  self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc-date-hover]').forEach((date) => date.removeAttribute('data-vc-date-hover'));
};
