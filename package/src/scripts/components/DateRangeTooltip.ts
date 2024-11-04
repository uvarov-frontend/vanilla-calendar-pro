import type { VanillaCalendarPro } from '@src/index';

const DateRangeTooltip = (self: VanillaCalendarPro) =>
  !self.onCreateDateRangeTooltip ? '' : `<div class="${self.styles.dateRangeTooltip}" data-vc="date-range-tooltip"></div>`;

export default DateRangeTooltip;
