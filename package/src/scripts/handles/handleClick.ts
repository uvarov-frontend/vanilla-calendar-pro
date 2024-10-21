import handleClickArrow from '@scripts/handles/handleClickArrow';
import handleClickDay from '@scripts/handles/handleClickDay';
import handleClickMonthOrYear from '@scripts/handles/handleClickMonthOrYear';
import handleClickWeekNumber from '@scripts/handles/handleClickWeekNumber';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleClick = (self: VanillaCalendar) => {
  const clickEventHandler = (e: MouseEvent) => {
    handleClickArrow(self, e);
    handleClickWeekNumber(self, e);
    handleClickDay(self, e);
    handleClickMonthOrYear(self, e);
  };

  self.HTMLElement.addEventListener('click', clickEventHandler);
  return () => self.HTMLElement.removeEventListener('click', clickEventHandler);
};

export default handleClick;
