import getDate from '@scripts/utils/getDate';
import type { VanillaCalendarPro } from '@src/index';
import type { FormatDateString } from '@src/types';

const initDateMinMax = (self: VanillaCalendarPro) => {
  self.private.dateMin = self.displayDisabledDates ? getDate(self.dateMin as FormatDateString) : getDate(self.private.displayDateMin);
  self.private.dateMax = self.displayDisabledDates ? getDate(self.dateMax as FormatDateString) : getDate(self.private.displayDateMax);
};

export default initDateMinMax;
