import type { Calendar, FormatDateString } from '@src/index';

export type RangeState = {
  lastDateEl: HTMLElement | null;
  isHovering: boolean;
  rangeMin: FormatDateString | undefined;
  rangeMax: FormatDateString | undefined;
  tooltipEl: HTMLElement | null;
  timeoutId: NodeJS.Timeout | null;
  frameId: number | null;
  cleanup?: () => void;
};

const states = new WeakMap<Calendar, RangeState>();

const getRangeState = (self: Calendar) => {
  let state = states.get(self);
  if (!state) {
    state = { lastDateEl: null, isHovering: false, rangeMin: undefined, rangeMax: undefined, tooltipEl: null, timeoutId: null, frameId: null };
    states.set(self, state);
  }
  return state;
};

export const clearRangeState = (self: Calendar) => {
  const state = states.get(self);
  if (!state) return;
  state.cleanup?.();
  state.cleanup = undefined;
  if (state.timeoutId !== null) clearTimeout(state.timeoutId);
  if (state.frameId !== null) cancelAnimationFrame(state.frameId);
  state.lastDateEl = null;
  state.tooltipEl = null;
  state.timeoutId = null;
  state.frameId = null;
  states.delete(self);
};

export default getRangeState;
