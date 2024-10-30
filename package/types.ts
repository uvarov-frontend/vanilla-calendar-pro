import type labels from './labels';
import type styles from './styles';

type LeadingZero = `${0}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
type MM = LeadingZero | 10 | 11 | 12;
type DD = LeadingZero | `${1 | 2}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | 30 | 31;
export type FormatDateString = `${number}-${MM}-${DD}`;

export type Positions = 'bottom' | 'top' | 'center' | 'left' | 'right';

export type TypesCalendar = 'default' | 'multiple' | 'month' | 'year';

export type WeekDayID = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeekDays<T> = [...T[]];

export type Range<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Range<N, [...Acc, Acc['length']]>;

export type CSSClasses = typeof styles;

export type AriaLabels = typeof labels;

export interface HtmlElementPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface IDates {
  min: FormatDateString | 'today';
  max: FormatDateString | 'today';
  today: Date;
}

export interface IRange {
  min?: FormatDateString | 'today';
  max?: FormatDateString | 'today';
  disablePast: boolean;
  disableGaps: boolean;
  edgesOnly?: boolean;
  disableAllDays: boolean;
  disableWeekday?: number[];
  disabled?: Array<Date | number | string>;
  enabled?: Array<Date | number | string>;
  hourMin: Range<24>;
  hourMax: Range<24>;
  minuteMin: Range<60>;
  minuteMax: Range<60>;
}

export interface ISelection {
  day: false | 'single' | 'multiple' | 'multiple-ranged';
  month: boolean | 'only-arrows';
  year: boolean | 'only-arrows';
  time: false | 12 | 24;
  controlTime: 'all' | 'range';
  stepHours: number;
  stepMinutes: number;
}

export interface ISelected {
  month?: number;
  year?: number;
  dates?: Array<Date | number | string>;
  holidays?: Array<Date | number | string>;
  weekend?: WeekDays<WeekDayID>;
  time?: string;
}

export type ToggleSelected = boolean | ((self: IVanillaCalendar) => boolean);

export interface IVisibility {
  /** This parameter determines the theme of the calendar. By default, the theme is determined by the user's system or website settings. */
  theme: 'light' | 'dark' | 'system' | string;
  /** To automatically detect and apply the website's theme to the calendar, you can pass a string value as a CSS selector. */
  themeDetect: string | false;
  /** With this parameter, you can decide whether to display week numbers in the calendar. */
  weekNumbers: boolean;
  /** With this parameter, you can highlight the current day in the calendar. */
  today: boolean;
  /** This parameter determines whether all days, including disabled days, will be displayed. */
  disabled: boolean;
  /** With this parameter, you can decide whether to display days from the previous and next months. */
  daysOutside: boolean;
  /** This parameter specifies the position of the calendar relative to input, if the calendar is initialized with the `input` parameter. */
  positionToInput: 'auto' | 'center' | 'left' | 'right' | ['bottom' | 'top', 'center' | 'left' | 'right'];
}

export interface ISettings {
  lang: string;
  range: IRange;
  selection: ISelection;
  selected: ISelected;
  visibility: IVisibility;
}

export interface IMonthsLocale {
  long: string[];
  short: string[];
}

export interface IWeekdayLocale {
  long: string[];
  short: string[];
}

export interface ILocale {
  months: IMonthsLocale;
  weekday: IWeekdayLocale;
  ariaLabels: AriaLabels;
}

export interface IActions {
  clickDay: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  clickWeekNumber: ((e: MouseEvent, number: number, days: HTMLElement[], year: number, self: IVanillaCalendar) => void) | null;
  clickWeekDay: ((e: MouseEvent, day: number, days: HTMLElement[], self: IVanillaCalendar) => void) | null;
  clickTitle: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  clickMonth: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  clickYear: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  clickArrow: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  changeTime: ((e: Event, self: IVanillaCalendar, isError: boolean) => void) | null;
  changeToInput: ((e: Event, self: IVanillaCalendar) => void) | null;
  getDays: ((day: number, date: FormatDateString, HTMLElement: HTMLElement, HTMLButtonElement: HTMLButtonElement, self: IVanillaCalendar) => void) | null;
  getMonths: ((month: number, HTMLElement: HTMLElement, self: IVanillaCalendar) => void) | null;
  getYears: ((year: number, HTMLElement: HTMLElement, self: IVanillaCalendar) => void) | null;
  initCalendar: ((self: IVanillaCalendar) => void) | null;
  updateCalendar: ((self: IVanillaCalendar) => void) | null;
  destroyCalendar: ((self: IVanillaCalendar) => void) | null;
  showCalendar: ((self: IVanillaCalendar) => void) | null;
  hideCalendar: ((self: IVanillaCalendar) => void) | null;
}

export type IPopup = {
  modifier?: string;
  html?: string;
};

export type IPopups = {
  [date in FormatDateString]: IPopup;
};

export interface IDOMTemplates {
  default: string;
  multiple: string;
  month: string;
  year: string;
}

export interface IReset {
  year?: boolean;
  month?: boolean;
  dates?: boolean | 'only-first';
  time?: boolean;
}

export interface IOptions {
  input?: boolean;
  type?: TypesCalendar;
  months?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  jumpMonths?: number;
  jumpToSelectedDate?: boolean;
  toggleSelected?: ToggleSelected;
  weekStartDay?: WeekDayID;
  switchMonthForDate?: boolean;
  date?: Partial<IDates>;
  sanitizer?: (dirtyHtml: string) => unknown;
  settings?: Partial<{
    lang: string;
    range: Partial<IRange>;
    selection: Partial<ISelection>;
    selected: Partial<ISelected>;
    visibility: Partial<IVisibility>;
  }>;
  locale?: Partial<{
    months: Partial<IMonthsLocale>;
    weekday: Partial<IWeekdayLocale>;
    ariaLabels: Partial<AriaLabels>;
  }>;
  actions?: Partial<IActions>;
  popups?: IPopups;
  CSSClasses?: Partial<CSSClasses>;
  DOMTemplates?: Partial<IDOMTemplates>;
}

export interface IVanillaCalendar {
  input: boolean;
  type: TypesCalendar;
  months: number;
  jumpMonths: number;
  jumpToSelectedDate: boolean;
  toggleSelected: ToggleSelected;
  weekStartDay: WeekDayID;
  switchMonthForDate: boolean;
  date: IDates;
  settings: {
    lang: string;
    range: IRange;
    selection: ISelection;
    selected: ISelected;
    visibility: IVisibility;
  };
  locale: {
    months: {
      short: string[];
      long: string[];
    };
    weekday: {
      short: string[];
      long: string[];
    };
    ariaLabels: AriaLabels;
  };
  actions: IActions;
  sanitizer: (dirtyHtml: string) => unknown;
  popups: IPopups;
  CSSClasses: CSSClasses;
  DOMTemplates: IDOMTemplates;

  init: () => () => void;
  update: (reset?: IReset) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;

  readonly HTMLElement: HTMLElement;
  readonly HTMLOriginalElement: HTMLElement;
  readonly HTMLInputElement?: HTMLInputElement;
  readonly rangeMin: FormatDateString;
  readonly rangeMax: FormatDateString;
  readonly rangeDisabled: FormatDateString[];
  readonly rangeEnabled: FormatDateString[];
  readonly selectedDates: FormatDateString[];
  readonly selectedMonth: number;
  readonly selectedYear: number;
  readonly selectedHours?: string;
  readonly selectedMinutes?: string;
  readonly selectedKeeping?: string;
  readonly selectedTime?: string;
  readonly currentType: TypesCalendar;
  readonly viewYear: number;
  readonly dateMin: Date;
  readonly dateMax: Date;
  readonly isInit: boolean;
  readonly isInputInit: boolean;
}
