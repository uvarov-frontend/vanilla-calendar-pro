import type {
  FormatDateString,
  IActions,
  ILayouts,
  IPopups,
  IPrivateVariables,
  IRange,
  IReset,
  ISelection,
  Labels,
  Locale,
  MonthsCount,
  Styles,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
  WeekDays,
} from '../types';

export interface IVanillaCalendar extends IActions {
  viewType: TypesCalendar;

  isInput: boolean;
  positionToInput: 'auto' | 'center' | 'left' | 'right' | ['bottom' | 'top', 'center' | 'left' | 'right'];

  firstWeekday: WeekDayID;
  monthsToSwitch: number;
  themeAttrDetect: string | false;

  locale: Locale;

  dateToday: Date;
  dateMin: FormatDateString | 'today';
  dateMax: FormatDateString | 'today';

  displayMonthsCount: MonthsCount;
  displayDateMin: FormatDateString | 'today';
  displayDateMax: FormatDateString | 'today';
  displayDatesOutside: boolean;
  displayDisabledDates: boolean;

  disableDates: Array<Date | number | string>;
  disableAllDates: boolean;
  disableDatesPast: boolean;
  disableDatesGaps: boolean;
  disableWeekdays: number[];
  disableToday: boolean;

  enableDates: Array<Date | number | string>;
  enableEdgeDatesOnly: boolean;
  enableDateToggle: ToggleSelected;
  enableWeekNumbers: boolean;
  enableMonthChangeOnDayClick: boolean;
  enableJumpToSelectedDate: boolean;

  selectionDatesMode: false | 'single' | 'multiple' | 'multiple-ranged';
  selectionMonthsMode: boolean | 'only-arrows';
  selectionYearsMode: boolean | 'only-arrows';
  selectionTimeMode: false | 12 | 24;

  selectedDates: Array<Date | number | string>;
  selectedMonth: number;
  selectedYear: number;
  selectedHolidays: Array<Date | number | string>;
  selectedWeekends: WeekDays<WeekDayID>;
  selectedTime: string;
  selectedTheme: 'light' | 'dark' | 'system' | string;

  settings: {
    range: IRange;
    selection: ISelection;
  };

  sanitizerHTML: (dirtyHtml: string) => unknown;
  labels: Labels;
  layouts: ILayouts;
  styles: Styles;
  popups: IPopups;

  init: () => () => void;
  update: (reset?: IReset) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;

  readonly private: IPrivateVariables;
}
