import layoutDefault from '@scripts/layouts/default';
import getRootNode from '@scripts/utils/getRootNode';
import { getExtensions, type RenderState } from '@src/extension';
import type { Calendar } from '@src/index';

export const defaultSanitizer = (html: string) => html;

export type { RenderState } from '@src/extension';

const states = new WeakMap<Calendar, RenderState>();

export const clearRenderState = (self: Calendar) => {
  states.get(self)?.observer.disconnect();
  states.delete(self);
};

export const pauseRenderObservation = clearRenderState;

const eligible = (self: Calendar) =>
  !self.animation &&
  !self.enableCollapse &&
  !self.onCreateDateEls &&
  !self.onCreateDateRangeTooltip &&
  !self.disableDatesGaps &&
  !(self.popups && Object.keys(self.popups).length) &&
  self.sanitizerHTML === defaultSanitizer &&
  (self.context.currentType === 'default' || self.context.currentType === 'multiple') &&
  self.layouts[self.context.currentType] === (self.context.currentType === 'multiple' ? getExtensions(self).months?.layout(self) : layoutDefault(self));

const optionsKey = (self: Calendar) =>
  JSON.stringify(
    Object.entries(self).filter(([key]) => key !== 'context' && key !== 'selectedDates'),
    (_, value) => (typeof value === 'function' ? true : value),
  );

export const renderStructure = ({ context: c }: Calendar) =>
  JSON.stringify([
    c.currentType,
    c.locale,
    c.dateToday,
    c.dateMin,
    c.dateMax,
    c.displayDateMin,
    c.displayDateMax,
    c.selectedYear,
    c.selectedMonth,
    c.displayMonthsCount,
    c.selectedHours,
    c.selectedMinutes,
    c.selectedKeeping,
    c.selectedTime,
  ]);

const contextKey = (self: Calendar) =>
  JSON.stringify([
    renderStructure(self),
    self.context.displayYear,
    self.context.displayWeekDate,
    self.context.selectedDates,
    self.context.disableDates,
    self.context.enableDates,
  ]);

export const getReusableRender = (self: Calendar, navigation = false) => {
  const state = states.get(self);
  if (!state || (!navigation && !state.fullLayout) || state.dirty || state.observer.takeRecords().length || !eligible(self)) return;
  const active = getRootNode(self.context.mainElement).activeElement;
  // A full rebuild removes focused descendants. Keep that behavior rather than
  // silently retaining focus on a recycled cell or time control.
  if (
    active &&
    active !== self.context.mainElement &&
    self.context.mainElement.contains(active) &&
    (!navigation || active.closest('[data-vc="column"], [data-vc="dates"], [data-vc-week="numbers"]'))
  )
    return;
  try {
    if (state.options === optionsKey(self) && state.context === contextKey(self) && state.timezone === new Intl.DateTimeFormat().resolvedOptions().timeZone)
      return state;
  } catch {
    // Extra user properties may be cyclic; they must not make rendering fail.
  }
};

export const rememberRender = (self: Calendar, fullLayout = false) => {
  clearRenderState(self);
  if (!eligible(self) || self.context.isDestroyed) return;
  try {
    const options = optionsKey(self);
    const context = contextKey(self);
    if (options.length + context.length > 262144) return;
    const grids = Array.from(self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="dates"]'));
    if (grids.length !== self.context.displayMonthsCount) return;
    const state: RenderState = {
      observer: new MutationObserver(() => (state.dirty = true)),
      dirty: false,
      fullLayout,
      options,
      context,
      structure: renderStructure(self),
      timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
      month: self.context.selectedYear * 12 + self.context.selectedMonth,
      count: grids.length,
    };
    // External DOM edits invalidate reuse, including edits in the same task.
    state.observer.observe(self.context.mainElement, { subtree: true, childList: true, attributes: true, characterData: true });
    states.set(self, state);
  } catch {
    clearRenderState(self);
  }
};
