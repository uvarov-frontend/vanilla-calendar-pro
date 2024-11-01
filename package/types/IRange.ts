import type { Range } from '../types';

export interface IRange {
  disablePast: boolean;
  disableGaps: boolean;
  edgesOnly?: boolean;
  disableAllDays: boolean;
  disableWeekday?: number[];
  disabled?: Array<Date | number | string>;
  enabled?: Array<Date | number | string>;
  hourMin: Range<24>;
  hourMax: Range<24>;
  minuteMin: Range<60>;
  minuteMax: Range<60>;
}
