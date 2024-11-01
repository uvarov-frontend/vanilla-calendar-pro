import type { Range } from '../types';

export interface IRange {
  edgesOnly?: boolean;
  enabled?: Array<Date | number | string>;
  hourMin: Range<24>;
  hourMax: Range<24>;
  minuteMin: Range<60>;
  minuteMax: Range<60>;
}
