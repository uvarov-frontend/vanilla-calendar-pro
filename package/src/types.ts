import type { Calendar } from '@src/index';
import type labels from '@src/labels';
import type options from '@src/options';
import type styles from '@src/styles';

type LeadingZero = `0${number}`;

type MM = LeadingZero | 10 | 11 | 12;

type DD = LeadingZero | `${1 | 2}${number}` | 30 | 31;

export type FormatDateString = `${number}-${MM}-${DD}`;

export type MonthsCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Positions = 'bottom' | 'top' | 'center' | 'left' | 'right';

export type PositionToInput = 'auto' | 'center' | 'left' | 'right' | [Positions];

export type Range<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Range<N, [...Acc, Acc['length']]>;

export type ToggleSelected = boolean | ((self: Calendar) => boolean);

export type TypesCalendar = 'default' | 'multiple' | 'month' | 'year';

export type DateMode = 'single' | 'multiple' | 'multiple-ranged';

export type DateAny = Date | number | FormatDateString | 'today';

export type DatesArr = Array<Date | number | string>;

export type TimeControl = 'all' | 'range';

export type TimePicker = 'AM' | 'PM';

export type ThemesDefault = 'light' | 'dark' | 'system';

export type WeekDayID = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeekDays<T> = [...T[]];

export type LocaleStated = {
  months: {
    long: string[];
    short: string[];
  };
  weekdays: {
    long: string[];
    short: string[];
  };
};

export type Locale = string | LocaleStated;

export type Popup = {
  modifier?: string;
  html?: string;
};

export type Popups = {
  [date in FormatDateString]: Popup;
};

export type HtmlElementPosition = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type Reset = {
  year: boolean;
  month: boolean;
  dates: boolean | 'only-first';
  time: boolean;
  locale: boolean;
};

export type ContextVariables = {
  isInit: boolean;
  isShowInInputMode: boolean;
  inputModeInit: boolean;
  cleanupHandlers: Array<() => void>;
  currentType: TypesCalendar;
  locale: LocaleStated;
  mainElement: HTMLElement;
  originalElement: HTMLElement;
  inputElement?: HTMLInputElement;
  dateToday: FormatDateString;
  dateMin: FormatDateString;
  dateMax: FormatDateString;
  displayDateMin: FormatDateString;
  displayDateMax: FormatDateString;
  displayYear: number;
  displayMonthsCount: MonthsCount;
  disableDates: FormatDateString[];
  enableDates: FormatDateString[];
  selectedDates: FormatDateString[];
  selectedMonth: Range<12>;
  selectedYear: number;
  selectedHours: string;
  selectedMinutes: string;
  selectedKeeping: TimePicker | null;
  selectedTime: string;
};

export type Styles = typeof styles;

export type Labels = typeof labels;

export type Layouts = {
  default: string;
  multiple: string;
  month: string;
  year: string;
};

export type Options = Omit<Partial<options>, 'popups' | 'labels' | 'layouts' | 'styles'> & {
  popups?: Partial<Popups>;
  labels?: Partial<Labels>;
  layouts?: Partial<Layouts>;
  styles?: Partial<Styles>;
};
