import type * as T from './types';

declare class VanillaCalendar implements T.IVanillaCalendar {
  constructor(selector: HTMLElement | string, options?: Partial<T.IOptions>);

  input: boolean;
  type: T.TypesCalendar;
  months: number;
  jumpMonths: number;
  jumpToSelectedDate: boolean;
  toggleSelected: T.ToggleSelected;
  weekStartDay: T.WeekDayID;
  switchMonthForDate: boolean;
  date: T.IDates;
  settings: {
    range: T.IRange;
    selection: T.ISelection;
    selected: T.ISelected;
    visibility: T.IVisibility;
  };
  actions: T.IActions;

  sanitizerHTML: (dirtyHtml: string) => unknown;
  locale: T.Locale;
  labels: T.Labels;
  layouts: T.ILayouts;
  styles: T.Styles;
  popups: T.IPopups;

  init: () => () => void;
  update: (reset?: T.IReset) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;

  readonly rangeMin: T.FormatDateString;
  readonly rangeMax: T.FormatDateString;
  readonly rangeDisabled: T.FormatDateString[];
  readonly rangeEnabled: T.FormatDateString[];
  readonly selectedDates: T.FormatDateString[];
  readonly selectedMonth: number;
  readonly selectedYear: number;
  readonly selectedHours?: string;
  readonly selectedMinutes?: string;
  readonly selectedKeeping?: string;
  readonly selectedTime?: string;
  readonly viewYear: number;

  readonly private: T.IPrivateVariables;
}

export = VanillaCalendar;
