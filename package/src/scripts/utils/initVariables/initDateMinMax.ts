import type { FormatDateString } from '@package/types';
import getDate from '@scripts/utils/getDate';
import type VanillaCalendar from '@src/vanilla-calendar';

const initDateMinMax = (self: VanillaCalendar) => {
  self.dateMin = self.settings.visibility.disabled ? getDate(self.date.min as FormatDateString) : getDate(self.rangeMin);
  self.dateMax = self.settings.visibility.disabled ? getDate(self.date.max as FormatDateString) : getDate(self.rangeMax);
};

export default initDateMinMax;
