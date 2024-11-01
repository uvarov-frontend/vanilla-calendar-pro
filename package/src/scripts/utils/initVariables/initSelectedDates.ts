import parseDates from '@scripts/utils/parseDates';
import type { VanillaCalendar } from '@src/vanilla-calendar';

const initSelectedDates = (self: VanillaCalendar) => {
  self.private.selectedDates = self.selectedDates?.[0] ? parseDates(self.selectedDates) : [];
};

export default initSelectedDates;
