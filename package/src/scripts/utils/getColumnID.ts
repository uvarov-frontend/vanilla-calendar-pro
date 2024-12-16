import type { Calendar } from '@src/index';

const getColumnID = (self: Calendar) => {
  if (self.type !== 'multiple') return 0;
  const columnEls = self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="column"]');
  const indexColumn = Array.from(columnEls).findIndex((column) => column.closest('[data-vc-column="month"]'));
  return indexColumn > 0 ? indexColumn : 0;
};

export default getColumnID;
