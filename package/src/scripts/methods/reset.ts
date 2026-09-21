import create from '@scripts/creators/create';
import { cleanupDatePopups } from '@scripts/creators/createDates/createDatePopup';
import updateDateModifiers from '@scripts/creators/createDates/updateDateModifiers';
import createTime from '@scripts/creators/createTime';
import { resetGestures } from '@scripts/handles/handleGestures/handleGestures';
import handleDayRangedSelection, { cleanupDateRange } from '@scripts/handles/handleSelectDateRange/handleSelectDateRange';
import handleTheme from '@scripts/handles/handleTheme';
import { cleanupPending } from '@scripts/utils/animate';
import getLocale from '@scripts/utils/getLocale';
import initAllVariables from '@scripts/utils/initVariables/initAllVariables';
import { pauseRenderObservation, type RenderState, rememberRender, renderStructure } from '@scripts/utils/renderState';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Reset } from '@src/index';

const reset = (self: Calendar, { year, month, dates, time, locale }: Reset, recreate = true, reuse?: RenderState) => {
  pauseRenderObservation(self);
  resetGestures(self);
  cleanupPending(self.context.mainElement);
  cleanupDatePopups(self);
  cleanupDateRange(self);

  const previousSelected = {
    year: self.selectedYear,
    month: self.selectedMonth,
    dates: self.selectedDates,
    time: self.selectedTime,
  };

  self.selectedYear = year ? previousSelected.year : self.context.selectedYear;
  self.selectedMonth = month ? previousSelected.month : self.context.selectedMonth;
  self.selectedTime = time ? previousSelected.time : self.context.selectedTime;

  self.selectedDates =
    dates === 'only-first' && self.context.selectedDates?.[0]
      ? [self.context.selectedDates[0]]
      : dates === true
        ? previousSelected.dates
        : self.context.selectedDates;

  if (locale) {
    const locale = {
      months: { short: [], long: [] },
      weekdays: { short: [], long: [] },
    };
    setContext(self, 'locale', locale);
  }

  initAllVariables(self);
  if (recreate) {
    if (reuse) getLocale(self);
    if (reuse && reuse.structure === renderStructure(self)) {
      handleTheme(self);
      createTime(self);
      updateDateModifiers(self, true);
    } else create(self, false);
  }

  self.selectedYear = previousSelected.year;
  self.selectedMonth = previousSelected.month;
  self.selectedDates = previousSelected.dates;
  self.selectedTime = previousSelected.time;
  if (self.selectionDatesMode === 'multiple-ranged') handleDayRangedSelection(self, null, !!dates);
  if (recreate) rememberRender(self, true);
};

export default reset;
