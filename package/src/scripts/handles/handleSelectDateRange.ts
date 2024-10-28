import type { FormatDateString } from '@package/types';
import create from '@scripts/create';
import canToggleSelection from '@scripts/utils/canToggleSelection';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import parseDates from '@scripts/utils/parseDates';
import type VanillaCalendar from '@src/vanilla-calendar';

const current: { self: VanillaCalendar | null; rangeMin: FormatDateString | undefined; rangeMax: FormatDateString | undefined } = {
  self: null,
  rangeMin: undefined,
  rangeMax: undefined,
};

const removeHoverEffect = () => {
  if (!current.self?.HTMLElement) return;
  const dateEls = current.self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc-date]');
  dateEls.forEach((d) => ['data-vc-date-hover', 'data-vc-date-hover-first', 'data-vc-date-hover-last'].forEach((attr) => d.removeAttribute(attr)));
};

const addHoverEffect = (date: Date, firstDateEls: NodeListOf<HTMLDivElement>, lastDateEls: NodeListOf<HTMLDivElement>) => {
  if (!current.self?.selectedDates) return;

  const formattedDate = getDateString(date);
  if (current.self.rangeDisabled?.includes(formattedDate)) return;

  const dateEls = current.self.HTMLElement.querySelectorAll<HTMLElement>(`[data-vc-date="${formattedDate}"]`);
  dateEls?.forEach((d) => (d.dataset.vcDateHover = ''));

  firstDateEls.forEach((d) => (d.dataset.vcDateHoverFirst = ''));
  lastDateEls.forEach((d) => (d.dataset.vcDateHoverLast = ''));
};

const handleHoverDatesEvent = (e: MouseEvent) => {
  if (!e.target || !current.self?.selectedDates) return;

  const datesEl: HTMLDivElement | null = (e.target as HTMLElement).closest('[data-vc="dates"]');

  if (!datesEl) {
    removeHoverEffect();
    return;
  }

  const dateEl = (e.target as HTMLElement).closest<HTMLElement>('[data-vc-date]');
  if (!dateEl) return;

  const lastDateString = dateEl.dataset.vcDate as FormatDateString;
  const startDate = getDate(current.self.selectedDates[0]);
  const endDate = getDate(lastDateString);

  const firstDateEls = current.self.HTMLElement.querySelectorAll<HTMLDivElement>(`[data-vc-date="${current.self.selectedDates[0]}"]`);
  const lastDateEls = current.self.HTMLElement.querySelectorAll<HTMLDivElement>(`[data-vc-date="${lastDateString}"]`);

  const [firstDateElsCorrect, lastDateElsCorrect] = startDate < endDate ? [firstDateEls, lastDateEls] : [lastDateEls, firstDateEls];
  const [start, end] = startDate < endDate ? [startDate, endDate] : [endDate, startDate];

  removeHoverEffect();

  for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
    addHoverEffect(i, firstDateElsCorrect, lastDateElsCorrect);
  }
};

const handleCancelSelectionDates = (e: KeyboardEvent) => {
  if (!current.self || e.key !== 'Escape') return;
  current.self.selectedDates = [];
  current.self.HTMLElement.removeEventListener('mousemove', handleHoverDatesEvent);
  document.removeEventListener('keydown', handleCancelSelectionDates);
  create(current.self);
};

const updateDisabledDates = () => {
  if (!current.self?.selectedDates?.[0] || !current.self.rangeDisabled?.[0]) return;
  const selectedDate = getDate(current.self.selectedDates[0]);

  const [startDate, endDate] = current.self.rangeDisabled
    .map((dateStr) => getDate(dateStr))
    .reduce<
      [Date | null, Date | null]
    >(([start, end], disabledDate) => [selectedDate >= disabledDate ? disabledDate : start, selectedDate < disabledDate && end === null ? disabledDate : end], [null, null]);

  if (startDate) current.self.rangeMin = getDateString(new Date(startDate.setDate(startDate.getDate() + 1)));
  if (endDate) current.self.rangeMax = getDateString(new Date(endDate.setDate(endDate.getDate() - 1)));
};

const resetDisabledDates = () => {
  if (!current.self) return;
  current.self.rangeMin = current.rangeMin as FormatDateString;
  current.self.rangeMax = current.rangeMax as FormatDateString;
};

const handleSelectDateRange = (self: VanillaCalendar, formattedDate?: FormatDateString) => {
  if (formattedDate) {
    const selectedDateExists = self.selectedDates.length === 1 && self.selectedDates[0].includes(formattedDate);
    self.selectedDates =
      selectedDateExists && !canToggleSelection(self)
        ? [formattedDate, formattedDate]
        : selectedDateExists && canToggleSelection(self)
          ? []
          : self.selectedDates.length > 1
            ? [formattedDate]
            : [...self.selectedDates, formattedDate];
    self.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));
  }

  if (self.settings.range.disableGaps) {
    current.rangeMin = current.rangeMin ? current.rangeMin : self.rangeMin;
    current.rangeMax = current.rangeMax ? current.rangeMax : self.rangeMax;
  }

  current.self = self;
  removeHoverEffect();

  const selectionHandlers = {
    set: () => {
      self.HTMLElement.addEventListener('mousemove', handleHoverDatesEvent);
      self.HTMLElement.addEventListener('keydown', handleCancelSelectionDates);
      if (self.settings.range.disableGaps) updateDisabledDates();
    },
    reset: () => {
      const [startDate, endDate] = [self.selectedDates[0], self.selectedDates[self.selectedDates.length - 1]];
      const notSameDate = self.selectedDates[0] !== self.selectedDates[self.selectedDates.length - 1];
      const allDates = parseDates([`${startDate as string}:${endDate as string}`]);
      const actualDates = allDates.filter((d) => !self.rangeDisabled.includes(d));

      self.selectedDates = notSameDate ? (self.settings.range.edgesOnly ? [startDate, endDate] : actualDates) : [self.selectedDates[0], self.selectedDates[0]];
      self.HTMLElement.removeEventListener('mousemove', handleHoverDatesEvent);
      self.HTMLElement.removeEventListener('keydown', handleCancelSelectionDates);
      if (self.settings.range.disableGaps) resetDisabledDates();
    },
  };
  selectionHandlers[self.selectedDates.length === 1 ? 'set' : 'reset']();
};

export default handleSelectDateRange;
