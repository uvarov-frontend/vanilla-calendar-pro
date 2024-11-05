import createDateRangeTooltip from '@scripts/creators/createDates/createDateRangeTooltip';
import canToggleSelection from '@scripts/utils/canToggleSelection';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import parseDates from '@scripts/utils/parseDates';
import type { FormatDateString, VanillaCalendarPro } from '@src/index';

const current: {
  self: VanillaCalendarPro | null;
  lastDateEl: HTMLElement | null;
  isHovering: boolean;
  rangeMin: FormatDateString | undefined;
  rangeMax: FormatDateString | undefined;
  tooltipEl: HTMLElement | null;
  tooltipElBCR: DOMRect | null;
  elementElBCR: DOMRect | null;
} = {
  self: null,
  lastDateEl: null,
  isHovering: false,
  rangeMin: undefined,
  rangeMax: undefined,
  tooltipEl: null,
  tooltipElBCR: null,
  elementElBCR: null,
};

const removeHoverEffect = () => {
  if (!current.self?.private?.mainElement) return;
  const dateEls = current.self.private.mainElement.querySelectorAll<HTMLElement>('[data-vc-date-hover], [data-vc-date-hover-first], [data-vc-date-hover-last]');
  dateEls.forEach((d) => {
    d.removeAttribute('data-vc-date-hover');
    d.removeAttribute('data-vc-date-hover-first');
    d.removeAttribute('data-vc-date-hover-last');
  });
};

const addHoverEffect = (date: Date, firstDateEl: HTMLElement | null, lastDateEl: HTMLElement | null) => {
  if (!current.self?.private?.selectedDates[0]) return;

  const formattedDate = getDateString(date);
  if (current.self.private.disableDates?.includes(formattedDate)) return;

  current.self.private.mainElement.querySelectorAll<HTMLElement>(`[data-vc-date="${formattedDate}"]`).forEach((d) => (d.dataset.vcDateHover = ''));
  if (firstDateEl) firstDateEl.dataset.vcDateHoverFirst = '';
  if (lastDateEl) lastDateEl.dataset.vcDateHoverLast = '';
};

const handleHoverDatesEvent = (e: MouseEvent) => {
  if (!e.target || !current.self?.private?.selectedDates[0]) return;

  if (!(e.target as HTMLElement).closest('[data-vc="dates"]')) {
    current.lastDateEl = null;
    createDateRangeTooltip(current.self, current.tooltipEl, null, null, null);
    removeHoverEffect();
    return;
  }

  const dateEl = (e.target as HTMLElement).closest<HTMLElement>('[data-vc-date]');
  if (!dateEl || current.lastDateEl === dateEl) return;

  current.lastDateEl = dateEl;
  createDateRangeTooltip(current.self, current.tooltipEl, dateEl, current.elementElBCR, current.tooltipElBCR);
  removeHoverEffect();

  const lastDateString = dateEl.dataset.vcDate as FormatDateString;
  const startDate = getDate(current.self.private.selectedDates[0]);
  const endDate = getDate(lastDateString);

  const firstDateEl = current.self.private.mainElement.querySelector<HTMLElement>(`[data-vc-date="${current.self.private.selectedDates[0]}"]`);
  const lastDateEl = current.self.private.mainElement.querySelector<HTMLElement>(`[data-vc-date="${lastDateString}"]`);

  const [firstDateElCorrect, lastDateElCorrect] = startDate < endDate ? [firstDateEl, lastDateEl] : [lastDateEl, firstDateEl];
  const [start, end] = startDate < endDate ? [startDate, endDate] : [endDate, startDate];

  for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
    addHoverEffect(i, firstDateElCorrect, lastDateElCorrect);
  }
};

const optimizedHandleHoverDatesEvent = (e: MouseEvent) => {
  if (!current.isHovering) {
    current.isHovering = true;
    requestAnimationFrame(() => {
      handleHoverDatesEvent(e);
      current.isHovering = false;
    });
  }
};

const handleCancelSelectionDates = (e: KeyboardEvent) => {
  if (!current.self || e.key !== 'Escape') return;
  current.lastDateEl = null;
  current.self.private.selectedDates = [];
  current.self.private.mainElement!.removeEventListener('mousemove', optimizedHandleHoverDatesEvent);
  current.self.private.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);
  createDateRangeTooltip(current.self, current.tooltipEl, null, null, null);
  removeHoverEffect();
};

const updateDisabledDates = () => {
  if (!current.self?.private?.selectedDates?.[0] || !current.self.private.disableDates?.[0]) return;
  const selectedDate = getDate(current.self.private.selectedDates[0]);

  const [startDate, endDate] = current.self.private.disableDates
    .map((dateStr) => getDate(dateStr))
    .reduce<
      [Date | null, Date | null]
    >(([start, end], disabledDate) => [selectedDate >= disabledDate ? disabledDate : start, selectedDate < disabledDate && end === null ? disabledDate : end], [null, null]);

  if (startDate) current.self.private.displayDateMin = getDateString(new Date(startDate.setDate(startDate.getDate() + 1)));
  if (endDate) current.self.private.displayDateMax = getDateString(new Date(endDate.setDate(endDate.getDate() - 1)));

  const isDisablePast =
    current.self.disableDatesPast && !current.self.disableAllDates && getDate(current.self.private.displayDateMin) < getDate(current.self.private.dateToday);
  if (isDisablePast) current.self.private.displayDateMin = current.self.private.dateToday;
};

const handleSelectDateRange = (self: VanillaCalendarPro, dateEl: HTMLElement | null) => {
  current.self = self;
  current.lastDateEl = dateEl;

  removeHoverEffect();

  if (self.disableDatesGaps) {
    current.rangeMin = current.rangeMin ? current.rangeMin : self.private.displayDateMin;
    current.rangeMax = current.rangeMax ? current.rangeMax : self.private.displayDateMax;
  }

  if (!!self.onCreateDateRangeTooltip) {
    current.tooltipEl = self.private.mainElement.querySelector<HTMLElement>('[data-vc-date-range-tooltip]') as HTMLElement;
    current.elementElBCR = self.private.mainElement.getBoundingClientRect();
    current.tooltipElBCR = current.tooltipEl.getBoundingClientRect();
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
      createDateRangeTooltip(current.self!, current.tooltipEl, dateEl, current.elementElBCR, current.tooltipElBCR);

      current.self!.private.mainElement!.addEventListener('mousemove', optimizedHandleHoverDatesEvent);
      current.self!.private.mainElement!.addEventListener('keydown', handleCancelSelectionDates);

      return () => {
        current.self!.private.mainElement!.removeEventListener('mousemove', optimizedHandleHoverDatesEvent);
        current.self!.private.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);
      };
    },
    reset: () => {
      const [startDate, endDate] = [self.private.selectedDates[0], self.private.selectedDates[self.private.selectedDates.length - 1]];
      const notSameDate = self.private.selectedDates[0] !== self.private.selectedDates[self.private.selectedDates.length - 1];
      const allDates = parseDates([`${startDate as string}:${endDate as string}`]);
      const actualDates = allDates.filter((d) => !self.private.disableDates.includes(d));
      createDateRangeTooltip(current.self!, current.tooltipEl, null, null, null);

      self.private.selectedDates = notSameDate
        ? self.enableEdgeDatesOnly
          ? [startDate, endDate]
          : actualDates
        : [self.private.selectedDates[0], self.private.selectedDates[0]];

      if (self.disableDatesGaps) {
        self.private.displayDateMin = current.rangeMin as FormatDateString;
        self.private.displayDateMax = current.rangeMax as FormatDateString;
      }

      current.self!.private.mainElement!.removeEventListener('mousemove', optimizedHandleHoverDatesEvent);
      current.self!.private.mainElement!.removeEventListener('keydown', handleCancelSelectionDates);
    },
  };
  selectionHandlers[self.private.selectedDates.length === 1 ? 'set' : 'reset']();
};

export default handleSelectDateRange;
