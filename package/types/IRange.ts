import type { Range } from '../types';

export interface IRange {
  hourMin: Range<24>;
  hourMax: Range<24>;
  minuteMin: Range<60>;
  minuteMax: Range<60>;
}
