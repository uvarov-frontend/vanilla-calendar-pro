import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import handleCancelSelectionDates from '@scripts/handles/handleSelectDateRange/handleCancelSelectionDates';
import handleMouseLeave from '@scripts/handles/handleSelectDateRange/handleMouseLeave';
import { optimizedHandleHoverDatesEvent, optimizedHandleHoverSelectedDatesRangeEvent } from '@scripts/handles/handleSelectDateRange/optimizedHandles';
import state from '@scripts/handles/handleSelectDateRange/state';
import { removeHoverEffect } from '@scripts/handles/handleSelectDateRange/toggleHoverEffect';
import updateDisabledDates from '@scripts/handles/handleSelectDateRange/updateDisabledDates';
import canToggleSelection from '@scripts/utils/canToggleSelection';
import parseDates from '@scripts/utils/parseDates';
import type { FormatDateString, VanillaCalendarPro } from '@src/index';

const handleSelectDateRange = (self: VanillaCalendarPro, dateEl: HTMLElement | null) => {
  state.self = self;
  state.lastDateEl = dateEl;

  removeHoverEffect();

  if (self.disableDatesGaps) {
    state.rangeMin = state.rangeMin ? state.rangeMin : self.private.displayDateMin;
    state.rangeMax = state.rangeMax ? state.rangeMax : self.private.displayDateMax;
  }

  if (!!self.onCreateDateRangeTooltip) {
    state.tooltipEl = self.private.mainElement.querySelector<HTMLElement>('[data-vc-date-range-tooltip]') as HTMLElement;
  }

  const formattedDate = dateEl?.dataset.vcDate as FormatDateString | undefined;
  if (formattedDate) {
    const selectedDateExists = self.private.selectedDates.length === 1 && self.private.selectedDates[0].includes(formattedDate);
    self.private.selectedDates =
      selectedDateExists && !canToggleSelection(self)
        ? [formattedDate, formattedDate]
        : selectedDateExists && canToggleSelection(self)
          ? []
          : self.private.selectedDates.length > 1
            ? [formattedDate]
            : [...self.private.selectedDates, formattedDate];
    if (self.private.selectedDates.length > 1) self.private.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));
  }

  const selectionHandlers = {
    set: () => {
      if (self.disableDatesGaps) updateDisabledDates();
      createDateRangeTooltip(state.self!, state.tooltipEl, dateEl);

      state.self!.private.mainElement!.removeEventListener('mousemove', optimizedHandleHoverSelectedDatesRangeEvent);
      state.self!.private.mainElement!.removeEventListener('mouseleave', handleMouseLeave);
      state.self!.private.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);
      state.self!.private.mainElement!.addEventListener('mousemove', optimizedHandleHoverDatesEvent);
      state.self!.private.mainElement!.addEventListener('mouseleave', handleMouseLeave);
      state.self!.private.mainElement!.addEventListener('keydown', handleCancelSelectionDates);

      return () => {
        state.self!.private.mainElement!.removeEventListener('mousemove', optimizedHandleHoverDatesEvent);
        state.self!.private.mainElement!.removeEventListener('mouseleave', handleMouseLeave);
        state.self!.private.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);
      };
    },
    reset: () => {
      const [startDate, endDate] = [self.private.selectedDates[0], self.private.selectedDates[self.private.selectedDates.length - 1]];
      const notSameDate = self.private.selectedDates[0] !== self.private.selectedDates[self.private.selectedDates.length - 1];
      const allDates = parseDates([`${startDate as string}:${endDate as string}`]);
      const actualDates = allDates.filter((d) => !self.private.disableDates.includes(d));

      self.private.selectedDates = notSameDate
        ? self.enableEdgeDatesOnly
          ? [startDate, endDate]
          : actualDates
        : [self.private.selectedDates[0], self.private.selectedDates[0]];

      if (self.disableDatesGaps) {
        self.private.displayDateMin = state.rangeMin as FormatDateString;
        self.private.displayDateMax = state.rangeMax as FormatDateString;
      }

      state.self!.private.mainElement!.removeEventListener('mousemove', optimizedHandleHoverDatesEvent);
      state.self!.private.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);
      state.self!.private.mainElement!.removeEventListener('mouseleave', handleMouseLeave);

      if (!self.onCreateDateRangeTooltip) return;
      if (!self.private.selectedDates[0]) {
        state.self!.private.mainElement!.removeEventListener('mousemove', optimizedHandleHoverSelectedDatesRangeEvent);
        state.self!.private.mainElement!.removeEventListener('mouseleave', handleMouseLeave);
        createDateRangeTooltip(state.self!, state.tooltipEl, null);
      }
      if (self.private.selectedDates[0]) {
        state.self!.private.mainElement!.addEventListener('mousemove', optimizedHandleHoverSelectedDatesRangeEvent);
        state.self!.private.mainElement!.addEventListener('mouseleave', handleMouseLeave);
        createDateRangeTooltip(state.self!, state.tooltipEl, dateEl);
      }

      return () => {
        state.self!.private.mainElement!.removeEventListener('mousemove', optimizedHandleHoverSelectedDatesRangeEvent);
        state.self!.private.mainElement!.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
  };
  selectionHandlers[self.private.selectedDates.length === 1 ? 'set' : 'reset']();
};

export default handleSelectDateRange;
