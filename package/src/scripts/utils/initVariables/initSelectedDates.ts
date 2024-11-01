import parseDates from '@scripts/utils/parseDates';
import type { VanillaCalendarPro } from '@src/index';

const initSelectedDates = (self: VanillaCalendarPro) => {
  self.private.selectedDates = self.selectedDates?.[0] ? parseDates(self.selectedDates) : [];
};

export default initSelectedDates;
