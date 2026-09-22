import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

const createDateRangeTooltip = (self: Calendar, tooltipEl: HTMLElement | null, dateEl: HTMLElement | null) =>
  getExtensions(self).annotations?.tooltip(self, tooltipEl, dateEl);

export default createDateRangeTooltip;
