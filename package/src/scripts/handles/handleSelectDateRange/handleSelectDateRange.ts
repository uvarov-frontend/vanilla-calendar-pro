import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import handleCancelSelectionDates from '@scripts/handles/handleSelectDateRange/handleCancelSelectionDates';
import handleMouseLeave from '@scripts/handles/handleSelectDateRange/handleMouseLeave';
import { optimizedHandleHoverDatesEvent, optimizedHandleHoverSelectedDatesRangeEvent } from '@scripts/handles/handleSelectDateRange/optimizedHandles';
import state from '@scripts/handles/handleSelectDateRange/state';
import { removeHoverEffect } from '@scripts/handles/handleSelectDateRange/toggleHoverEffect';
import updateDisabledDates from '@scripts/handles/handleSelectDateRange/updateDisabledDates';
import canToggleSelection from '@scripts/utils/canToggleSelection';
import parseDates from '@scripts/utils/parseDates';
import setContext from '@scripts/utils/setContext';
import type { Calendar, FormatDateString } from '@src/index';

const handleSelectDateRange = (self: Calendar, dateEl: HTMLElement | null) => {
  state.self = self;
  state.lastDateEl = dateEl;

  removeHoverEffect();

  if (self.disableDatesGaps) {
    state.rangeMin = state.rangeMin ? state.rangeMin : self.context.displayDateMin;
    state.rangeMax = state.rangeMax ? state.rangeMax : self.context.displayDateMax;
  }

  if (!!self.onCreateDateRangeTooltip) {
    state.tooltipEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc-date-range-tooltip]') as HTMLElement;
  }

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
      if (self.disableDatesGaps) updateDisabledDates();
      createDateRangeTooltip(state.self!, state.tooltipEl, dateEl);

      state.self!.context.mainElement!.removeEventListener('mousemove', optimizedHandleHoverSelectedDatesRangeEvent);
      state.self!.context.mainElement!.removeEventListener('mouseleave', handleMouseLeave);
      state.self!.context.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);

      state.self!.context.mainElement!.addEventListener('mousemove', optimizedHandleHoverDatesEvent);
      state.self!.context.mainElement!.addEventListener('mouseleave', handleMouseLeave);
      state.self!.context.mainElement!.addEventListener('keydown', handleCancelSelectionDates);

      return () => {
        state.self!.context.mainElement!.removeEventListener('mousemove', optimizedHandleHoverDatesEvent);
        state.self!.context.mainElement!.removeEventListener('mouseleave', handleMouseLeave);
        state.self!.context.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);
      };
    },
    reset: () => {
      const [startDate, endDate] = [self.context.selectedDates[0], self.context.selectedDates[self.context.selectedDates.length - 1]];
      const notSameDate = self.context.selectedDates[0] !== self.context.selectedDates[self.context.selectedDates.length - 1];
      const allDates = parseDates([`${startDate as string}:${endDate as string}`]);
      const actualDates = allDates.filter((d) => !self.context.disableDates.includes(d));

      const selectedDates = notSameDate
        ? self.enableEdgeDatesOnly
          ? [startDate, endDate]
          : actualDates
        : [self.context.selectedDates[0], self.context.selectedDates[0]];
      setContext(self, 'selectedDates', selectedDates);

      if (self.disableDatesGaps) {
        setContext(self, 'displayDateMin', state.rangeMin as FormatDateString);
        setContext(self, 'displayDateMax', state.rangeMax as FormatDateString);
      }

      state.self!.context.mainElement!.removeEventListener('mousemove', optimizedHandleHoverDatesEvent);
      state.self!.context.mainElement!.removeEventListener('mouseleave', handleMouseLeave);
      state.self!.context.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);

      if (!self.onCreateDateRangeTooltip) return;
      if (!self.context.selectedDates[0]) {
        state.self!.context.mainElement!.removeEventListener('mousemove', optimizedHandleHoverSelectedDatesRangeEvent);
        state.self!.context.mainElement!.removeEventListener('mouseleave', handleMouseLeave);
        createDateRangeTooltip(state.self!, state.tooltipEl, null);
      }
      if (self.context.selectedDates[0]) {
        state.self!.context.mainElement!.addEventListener('mousemove', optimizedHandleHoverSelectedDatesRangeEvent);
        state.self!.context.mainElement!.addEventListener('mouseleave', handleMouseLeave);
        createDateRangeTooltip(state.self!, state.tooltipEl, dateEl);
      }

      return () => {
        state.self!.context.mainElement!.removeEventListener('mousemove', optimizedHandleHoverSelectedDatesRangeEvent);
        state.self!.context.mainElement!.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
  };
  selectionHandlers[self.context.selectedDates.length === 1 ? 'set' : 'reset']();
};

export default handleSelectDateRange;
