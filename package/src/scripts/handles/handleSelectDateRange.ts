import create from '@scripts/creators/create';
import canToggleSelection from '@scripts/utils/canToggleSelection';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import parseDates from '@scripts/utils/parseDates';
import type { FormatDateString } from '@src/types';
import type VanillaCalendar from '@src/vanilla-calendar';

const current: { self: VanillaCalendar | null; rangeMin: FormatDateString | undefined; rangeMax: FormatDateString | undefined } = {
  self: null,
  rangeMin: undefined,
  rangeMax: undefined,
};

const removeHoverEffect = () => {
  if (!current.self?.private?.mainElement) return;
  const dateEls = current.self.private.mainElement.querySelectorAll<HTMLElement>('[data-vc-date]');
  dateEls.forEach((d) => ['data-vc-date-hover', 'data-vc-date-hover-first', 'data-vc-date-hover-last'].forEach((attr) => d.removeAttribute(attr)));
};

const addHoverEffect = (date: Date, firstDateEls: NodeListOf<HTMLDivElement>, lastDateEls: NodeListOf<HTMLDivElement>) => {
  if (!current.self?.private?.selectedDates) return;

  const formattedDate = getDateString(date);
  if (current.self.private.disableDates?.includes(formattedDate)) return;

  const dateEls = current.self.private.mainElement.querySelectorAll<HTMLElement>(`[data-vc-date="${formattedDate}"]`);
  dateEls?.forEach((d) => (d.dataset.vcDateHover = ''));

  firstDateEls.forEach((d) => (d.dataset.vcDateHoverFirst = ''));
  lastDateEls.forEach((d) => (d.dataset.vcDateHoverLast = ''));
};

const handleHoverDatesEvent = (e: MouseEvent) => {
  if (!e.target || !current.self?.private?.selectedDates) return;

  const datesEl: HTMLDivElement | null = (e.target as HTMLElement).closest('[data-vc="dates"]');

  if (!datesEl) {
    removeHoverEffect();
    return;
  }

  const dateEl = (e.target as HTMLElement).closest<HTMLElement>('[data-vc-date]');
  if (!dateEl) return;

  const lastDateString = dateEl.dataset.vcDate as FormatDateString;
  const startDate = getDate(current.self.private.selectedDates[0]);
  const endDate = getDate(lastDateString);

  const firstDateEls = current.self.private.mainElement.querySelectorAll<HTMLDivElement>(`[data-vc-date="${current.self.private.selectedDates[0]}"]`);
  const lastDateEls = current.self.private.mainElement.querySelectorAll<HTMLDivElement>(`[data-vc-date="${lastDateString}"]`);

  const [firstDateElsCorrect, lastDateElsCorrect] = startDate < endDate ? [firstDateEls, lastDateEls] : [lastDateEls, firstDateEls];
  const [start, end] = startDate < endDate ? [startDate, endDate] : [endDate, startDate];

  removeHoverEffect();

  for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
    addHoverEffect(i, firstDateElsCorrect, lastDateElsCorrect);
  }
};

const handleCancelSelectionDates = (e: KeyboardEvent) => {
  if (!current.self || e.key !== 'Escape') return;
  current.self.private.selectedDates = [];
  current.self.private.mainElement.removeEventListener('mousemove', handleHoverDatesEvent);
  document.removeEventListener('keydown', handleCancelSelectionDates);
  create(current.self);
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
};

const resetDisabledDates = () => {
  if (!current.self) return;
  current.self.private.displayDateMin = current.rangeMin as FormatDateString;
  current.self.private.displayDateMax = current.rangeMax as FormatDateString;
};

const handleSelectDateRange = (self: VanillaCalendar, formattedDate?: FormatDateString) => {
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
    self.private.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));
  }

  if (self.disableDatesGaps) {
    current.rangeMin = current.rangeMin ? current.rangeMin : self.private.displayDateMin;
    current.rangeMax = current.rangeMax ? current.rangeMax : self.private.displayDateMax;
  }

  current.self = self;
  removeHoverEffect();

  const selectionHandlers = {
    set: () => {
      self.private.mainElement.addEventListener('mousemove', handleHoverDatesEvent);
      self.private.mainElement.addEventListener('keydown', handleCancelSelectionDates);
      if (self.disableDatesGaps) updateDisabledDates();
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
      self.private.mainElement.removeEventListener('mousemove', handleHoverDatesEvent);
      self.private.mainElement.removeEventListener('keydown', handleCancelSelectionDates);
      if (self.disableDatesGaps) resetDisabledDates();
    },
  };
  selectionHandlers[self.private.selectedDates.length === 1 ? 'set' : 'reset']();
};

export default handleSelectDateRange;
