import type { Calendar } from '@src/index';

const getColumnID = (self: Calendar, type: string) => {
  if (self.type !== 'multiple') return { currentValue: null, columnID: 0 };

  const columnEls = self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="column"]');
  const columnID = Array.from(columnEls).findIndex((col) => col.closest(`[data-vc-column="${type}"]`));

  return {
    currentValue: columnID >= 0 ? Number(columnEls[columnID].querySelector<HTMLElement>(`[data-vc="${type}"]`)?.getAttribute(`data-vc-${type}`)) : null,
    columnID: Math.max(columnID, 0),
  };
};

export default getColumnID;
