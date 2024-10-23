import type * as T from './types';

declare class VanillaCalendar implements T.IVanillaCalendar {
  constructor(selector: HTMLElement | string, options?: Partial<T.IOptions>);

  input: boolean;
  type: T.TypesCalendar;
  months: number;
  jumpMonths: number;
  jumpToSelectedDate: boolean;
  toggleSelected: T.ToggleSelected;
  date: T.IDates;
  settings: {
    lang: string;
    range: T.IRange;
    selection: T.ISelection;
    selected: T.ISelected;
    visibility: T.IVisibility;
  };
  locale: T.ILocale;
  actions: T.IActions;
  popups: T.IPopups;
  CSSClasses: T.CSSClasses;
  DOMTemplates: T.IDOMTemplates;

  sanitizer: (dirtyHtml: string) => unknown;
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
  readonly selectedHolidays: T.FormatDateString[];
  readonly selectedWeekend: T.WeekDays | [];
  readonly selectedMonth: number;
  readonly selectedYear: number;
  readonly selectedHours?: string;
  readonly selectedMinutes?: string;
  readonly selectedKeeping?: string;
  readonly selectedTime?: string;
  readonly currentType: T.TypesCalendar;
  readonly correctMonths: number;
  readonly viewYear: number;
  readonly dateMin: Date;
  readonly dateMax: Date;
  readonly isInit: boolean;
  readonly isInputInit: boolean;
}

export = VanillaCalendar;
