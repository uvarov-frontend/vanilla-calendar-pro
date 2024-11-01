import type {
  FormatDateString,
  IActions,
  ILayouts,
  IPopups,
  IRange,
  ISelected,
  ISelection,
  IVisibility,
  Labels,
  Locale,
  MonthsCount,
  Styles,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
} from '../types';

export interface IOptions extends IActions {
  viewType?: TypesCalendar;

  isInput?: boolean;
  positionToInput?: 'auto' | 'center' | 'left' | 'right' | ['bottom' | 'top', 'center' | 'left' | 'right'];

  firstWeekday?: WeekDayID;
  monthsToSwitch?: number;
  themeAttrDetect?: string | false;

  locale?: Locale;

  dateToday?: Date;
  dateMin?: FormatDateString | 'today';
  dateMax?: FormatDateString | 'today';

  displayMonthsCount?: MonthsCount;
  displayDateMin?: FormatDateString | 'today';
  displayDateMax?: FormatDateString | 'today';
  displayDatesOutside?: boolean;
  displayDisabledDates?: boolean;

  disableDates?: Array<Date | number | string>;
  disableAllDates?: boolean;
  disableDatesPast?: boolean;
  disableDatesGaps?: boolean;
  disableWeekdays?: number[];
  disableToday?: boolean;

  enableDates?: Array<Date | number | string>;
  enableEdgeDatesOnly?: boolean;
  enableDateToggle?: ToggleSelected;
  enableWeekNumbers?: boolean;
  enableMonthChangeOnDayClick?: boolean;
  enableJumpToSelectedDate?: boolean;

  selectionDatesMode?: false | 'single' | 'multiple' | 'multiple-ranged';
  selectionMonthsMode?: boolean | 'only-arrows';
  selectionYearsMode?: boolean | 'only-arrows';
  selectionTimeMode?: false | 12 | 24;

  settings?: Partial<{
    range: Partial<IRange>;
    selection: Partial<ISelection>;
    selected: Partial<ISelected>;
    visibility: Partial<IVisibility>;
  }>;

  sanitizerHTML?: (dirtyHtml: string) => unknown;
  popups?: IPopups;
  labels?: Partial<Labels>;
  layouts?: Partial<ILayouts>;
  styles?: Partial<Styles>;
}
