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

  sanitizerHTML: (dirtyHtml: string) => unknown;
  locale: T.Locale;
  labels: T.Labels;
  styles: T.Styles;

  actions: T.IActions;
  popups: T.IPopups;
  DOMTemplates: T.IDOMTemplates;

  init: () => () => void;
  update: (reset?: T.IReset) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;

  readonly HTMLElement: HTMLElement;
  readonly HTMLOriginalElement: HTMLElement;
  readonly HTMLInputElement?: HTMLInputElement;
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
  readonly currentType: T.TypesCalendar;
  readonly viewYear: number;
  readonly dateMin: Date;
  readonly dateMax: Date;

  readonly private: T.IPrivateVariables;
}

export = VanillaCalendar;
