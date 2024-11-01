import type {
  FormatDateString,
  ILayouts,
  IPopups,
  IPrivateVariables,
  IReset,
  Labels,
  Locale,
  MonthsCount,
  Range,
  Styles,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
  WeekDays,
} from '../types';

export interface IVanillaCalendar {
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

  timeMinHour: Range<24>;
  timeMaxHour: Range<24>;
  timeMinMinute: Range<60>;
  timeMaxMinute: Range<60>;
  timeControls: 'all' | 'range';
  timeStepHour: number;
  timeStepMinute: number;

  sanitizerHTML: (dirtyHtml: string) => unknown;

  onClickDate: (e: MouseEvent, self: IVanillaCalendar) => void;
  onClickWeekDay: (e: MouseEvent, day: number, days: HTMLElement[], self: IVanillaCalendar) => void;
  onClickWeekNumber: (e: MouseEvent, number: number, days: HTMLElement[], year: number, self: IVanillaCalendar) => void;
  onClickTitle: (e: MouseEvent, self: IVanillaCalendar) => void;
  onClickMonth: (e: MouseEvent, self: IVanillaCalendar) => void;
  onClickYear: (e: MouseEvent, self: IVanillaCalendar) => void;
  onClickArrow: (e: MouseEvent, self: IVanillaCalendar) => void;
  onChangeTime: (e: Event, self: IVanillaCalendar, isError: boolean) => void;
  onChangeToInput: (e: Event, self: IVanillaCalendar) => void;
  onInit: (self: IVanillaCalendar) => void;
  onUpdate: (self: IVanillaCalendar) => void;
  onDestroy: (self: IVanillaCalendar) => void;
  onShow: (self: IVanillaCalendar) => void;
  onHide: (self: IVanillaCalendar) => void;

  popups: IPopups;
  labels: Labels;
  layouts: ILayouts;
  styles: Styles;

  init: () => () => void;
  update: (reset?: IReset) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;

  readonly private: IPrivateVariables;
}
