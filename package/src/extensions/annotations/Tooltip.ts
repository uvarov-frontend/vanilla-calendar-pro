import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const DateRangeTooltip = (self: Calendar) =>
  !!self.onCreateDateRangeTooltip ? `<div class="${escapeHTML(self.styles.dateRangeTooltip)}" data-vc-date-range-tooltip="hidden"></div>` : '';

export default DateRangeTooltip;
