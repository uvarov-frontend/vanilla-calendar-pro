import parseDates from '@scripts/utils/parseDates';
import type VanillaCalendar from '@src/vanilla-calendar';

const initSelectedDates = (self: VanillaCalendar) => {
  self.private.selectedDates = self.settings.selected.dates?.[0] ? parseDates(self.settings.selected.dates) : [];
};

export default initSelectedDates;
