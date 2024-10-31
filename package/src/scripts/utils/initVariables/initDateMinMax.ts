import type { FormatDateString } from '@package/types';
import getDate from '@scripts/utils/getDate';
import type VanillaCalendar from '@src/vanilla-calendar';

const initDateMinMax = (self: VanillaCalendar) => {
  self.private.dateMin = self.settings.visibility.disabled ? getDate(self.dateMin as FormatDateString) : getDate(self.private.displayDateMin);
  self.private.dateMax = self.settings.visibility.disabled ? getDate(self.dateMax as FormatDateString) : getDate(self.private.displayDateMax);
};

export default initDateMinMax;
