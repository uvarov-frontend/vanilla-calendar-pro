import parseDates from '@scripts/utils/parseDates';
import type { Calendar } from '@src/index';

const initSelectedDates = (self: Calendar) => {
  self.context.selectedDates = self.selectedDates?.[0] ? parseDates(self.selectedDates) : [];
};

export default initSelectedDates;
