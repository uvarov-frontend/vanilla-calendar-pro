import parseDates from '@scripts/utils/parseDates';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const initSelectedDates = (self: Calendar) => {
  setContext(self, 'selectedDates', self.selectedDates?.[0] ? parseDates(self.selectedDates) : []);
};

export default initSelectedDates;
