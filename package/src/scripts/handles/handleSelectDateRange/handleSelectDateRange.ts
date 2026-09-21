import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import handleCancelSelectionDates from '@scripts/handles/handleSelectDateRange/handleCancelSelectionDates';
import handleMouseLeave from '@scripts/handles/handleSelectDateRange/handleMouseLeave';
import optimizedHoverHandler from '@scripts/handles/handleSelectDateRange/optimizedHandles';
import getRangeState, { clearRangeState } from '@scripts/handles/handleSelectDateRange/state';
import { removeHoverEffect } from '@scripts/handles/handleSelectDateRange/toggleHoverEffect';
import updateDisabledDates from '@scripts/handles/handleSelectDateRange/updateDisabledDates';
import canToggleSelection from '@scripts/utils/canToggleSelection';
import parseDates from '@scripts/utils/parseDates';
import setContext from '@scripts/utils/setContext';
import type { Calendar, FormatDateString } from '@src/index';

export const cleanupDateRange = clearRangeState;

const handleSelectDateRange = (self: Calendar, dateEl: HTMLElement | null, recalculateSelection = true) => {
  const state = getRangeState(self);
  state.lastDateEl = dateEl;
  removeHoverEffect(self);

  if (!state.cleanup) {
    const element = self.context.mainElement;
    const hover = optimizedHoverHandler(self);
    const leave = () => handleMouseLeave(self);
    const cancel = (event: KeyboardEvent) => handleCancelSelectionDates(self, event);
    element.addEventListener('mousemove', hover);
    element.addEventListener('mouseleave', leave);
    element.addEventListener('keydown', cancel);
    state.cleanup = () => {
      element.removeEventListener('mousemove', hover);
      element.removeEventListener('mouseleave', leave);
      element.removeEventListener('keydown', cancel);
    };
  }

  if (self.disableDatesGaps) {
    state.rangeMin ??= self.context.displayDateMin;
    state.rangeMax ??= self.context.displayDateMax;
  }
  state.tooltipEl = !!self.onCreateDateRangeTooltip ? self.context.mainElement.querySelector<HTMLElement>('[data-vc-date-range-tooltip]') : null;

  const formattedDate = dateEl?.dataset.vcDate as FormatDateString | undefined;
  if (formattedDate) {
    const selectedDateExists = self.context.selectedDates.length === 1 && self.context.selectedDates[0].includes(formattedDate);
    const selectedDates =
      selectedDateExists && !canToggleSelection(self)
        ? [formattedDate, formattedDate]
        : selectedDateExists && canToggleSelection(self)
          ? []
          : self.context.selectedDates.length > 1
            ? [formattedDate]
            : [...self.context.selectedDates, formattedDate];
    setContext(self, 'selectedDates', selectedDates);
    if (self.context.selectedDates.length > 1) self.context.selectedDates.sort((a, b) => +new Date(a) - +new Date(b));
  }

  const selectionHandlers = {
    set: () => {
      if (self.disableDatesGaps) updateDisabledDates(self);
      createDateRangeTooltip(self, state.tooltipEl, dateEl);
    },
    reset: () => {
      if (!recalculateSelection) return;
      const [startDate, endDate] = [self.context.selectedDates[0], self.context.selectedDates[self.context.selectedDates.length - 1]];
      const notSameDate = self.context.selectedDates[0] !== self.context.selectedDates[self.context.selectedDates.length - 1];
      const getActualDates = () => {
        const disabled = new Set(self.context.disableDates);
        return parseDates([`${startDate as string}:${endDate as string}`]).filter((date) => !disabled.has(date));
      };

      const selectedDates = notSameDate
        ? self.enableEdgeDatesOnly
          ? [startDate, endDate]
          : getActualDates()
        : [self.context.selectedDates[0], self.context.selectedDates[0]];
      setContext(self, 'selectedDates', selectedDates);

      if (self.disableDatesGaps) {
        setContext(self, 'displayDateMin', state.rangeMin as FormatDateString);
        setContext(self, 'displayDateMax', state.rangeMax as FormatDateString);
      }

      if (!!self.onCreateDateRangeTooltip) createDateRangeTooltip(self, state.tooltipEl, self.context.selectedDates[0] ? dateEl : null);
    },
  };
  selectionHandlers[self.context.selectedDates.length === 1 ? 'set' : 'reset']();
};

export default handleSelectDateRange;
