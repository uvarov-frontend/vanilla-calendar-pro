import handleClickArrow from '@scripts/handles/handleClick/handleClickArrow';
import handleClickDate from '@scripts/handles/handleClick/handleClickDate';
import handleClickMonthOrYear from '@scripts/handles/handleClick/handleClickMonthOrYear';
import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

const handleClick = (self: Calendar) => {
  const clickEventHandler = (e: MouseEvent) => {
    handleClickArrow(self, e);
    getExtensions(self).weeks?.click(self, e);
    handleClickDate(self, e);
    handleClickMonthOrYear(self, e);
    getExtensions(self).weeks?.collapseClick(self, e);
  };

  self.context.mainElement.addEventListener('click', clickEventHandler);
  return () => self.context.mainElement.removeEventListener('click', clickEventHandler);
};

export default handleClick;
