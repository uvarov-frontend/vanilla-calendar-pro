import type { Calendar, FormatDateString } from '@src/index';

const state: {
  self: Calendar | null;
  lastDateEl: HTMLElement | null;
  isHovering: boolean;
  rangeMin: FormatDateString | undefined;
  rangeMax: FormatDateString | undefined;
  tooltipEl: HTMLElement | null;
  timeoutId: NodeJS.Timeout | null;
} = {
  self: null,
  lastDateEl: null,
  isHovering: false,
  rangeMin: undefined,
  rangeMax: undefined,
  tooltipEl: null,
  timeoutId: null,
};

export default state;
