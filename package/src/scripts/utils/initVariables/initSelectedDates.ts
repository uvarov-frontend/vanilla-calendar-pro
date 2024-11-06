import parseDates from '@scripts/utils/parseDates';
import type { VanillaCalendarPro } from '@src/index';

const initSelectedDates = (self: VanillaCalendarPro) => {
  self.context.selectedDates = self.selectedDates?.[0] ? parseDates(self.selectedDates) : [];
};

export default initSelectedDates;
