import type { FormatDateString } from '../types';

export interface IDates {
  min: FormatDateString | 'today';
  max: FormatDateString | 'today';
  today: Date;
}
