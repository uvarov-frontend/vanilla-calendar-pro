import type { VanillaCalendarPro } from '@src/index';
import type labels from '@src/labels';
import type options from '@src/options';
import type styles from '@src/styles';

type LeadingZero = `0${number}`;

type MM = LeadingZero | 10 | 11 | 12;

type DD = LeadingZero | `${1 | 2}${number}` | 30 | 31;

export type FormatDateString = `${number}-${MM}-${DD}`;

export type MonthsCount = number;

export type Positions = 'bottom' | 'top' | 'center' | 'left' | 'right';

export type Range<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Range<N, [...Acc, Acc['length']]>;

export type ToggleSelected = boolean | ((self: VanillaCalendarPro) => boolean);

export type TypesCalendar = 'default' | 'multiple' | 'month' | 'year';

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
  modifier: string;
  html: string;
};

export type Popups = {
  [date in FormatDateString]: Popup;
};

export type Dates = {
  min: FormatDateString | 'today';
  max: FormatDateString | 'today';
  today: Date;
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

export type PrivateVariables = {
  isInit: boolean;
  isInputInit: boolean;
  currentType: TypesCalendar;
  locale: LocaleStated;
  mainElement: HTMLElement;
  originalElement: HTMLElement;
  inputElement?: HTMLInputElement;
  dateMin: Date;
  dateMax: Date;
  displayDateMin: FormatDateString;
  displayDateMax: FormatDateString;
  displayYear: number;
  disableDates: FormatDateString[];
  enableDates: FormatDateString[];
  selectedDates: FormatDateString[];
  selectedMonth: number;
  selectedYear: number;
  selectedHours: string;
  selectedMinutes: string;
  selectedKeeping: string;
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

export type Options = Omit<Partial<options>, 'labels' | 'layouts' | 'styles'> & {
  labels?: Partial<Labels>;
  layouts?: Partial<Layouts>;
  styles?: Partial<Styles>;
};
