import type * as T from './types';

declare class VanillaCalendar implements T.IVanillaCalendar {
  constructor(selector: HTMLElement | string, options?: Partial<T.IOptions>);

  viewType: T.TypesCalendar;

  isInput: boolean;
  positionToInput: 'auto' | 'center' | 'left' | 'right' | ['bottom' | 'top', 'center' | 'left' | 'right'];

  firstWeekday: T.WeekDayID;
  monthsToSwitch: number;
  themeAttrDetect: string | false;

  locale: T.Locale;

  dateToday: Date;
  dateMin: T.FormatDateString | 'today';
  dateMax: T.FormatDateString | 'today';

  displayMonthsCount: T.MonthsCount;
  displayDateMin: T.FormatDateString | 'today';
  displayDateMax: T.FormatDateString | 'today';
  displayDatesOutside: boolean;
  displayDisabledDates: boolean;

  disableDates: Array<Date | number | string>;
  disableAllDates: boolean;
  disableDatesPast: boolean;
  disableDatesGaps: boolean;
  disableWeekdays: number[];
  disableToday: boolean;

  enableJumpToSelectedDate: boolean;
  enableDateToggle: T.ToggleSelected;
  enableMonthChangeOnDayClick: boolean;

  settings: {
    range: T.IRange;
    selection: T.ISelection;
    selected: T.ISelected;
    visibility: T.IVisibility;
  };

  sanitizerHTML: (dirtyHtml: string) => unknown;
  labels: T.Labels;
  layouts: T.ILayouts;
  styles: T.Styles;
  popups: T.IPopups;

  init: () => () => void;
  update: (reset?: T.IReset) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;

  readonly private: T.IPrivateVariables;
}

export = VanillaCalendar;
