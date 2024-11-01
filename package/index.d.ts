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

  enableDates: Array<Date | number | string>;
  enableEdgeDatesOnly: boolean;
  enableDateToggle: T.ToggleSelected;
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
  selectedWeekends: T.WeekDays<T.WeekDayID>;
  selectedTime: string;
  selectedTheme: 'light' | 'dark' | 'system' | string;

  timeMinHour: T.Range<24>;
  timeMaxHour: T.Range<24>;
  timeMinMinute: T.Range<60>;
  timeMaxMinute: T.Range<60>;
  timeControls: 'all' | 'range';
  timeStepHour: number;
  timeStepMinute: number;

  sanitizerHTML: (dirtyHtml: string) => unknown;

  onClickDate: (e: MouseEvent, self: T.IVanillaCalendar) => void;
  onClickWeekDay: (e: MouseEvent, day: number, days: HTMLElement[], self: T.IVanillaCalendar) => void;
  onClickWeekNumber: (e: MouseEvent, number: number, days: HTMLElement[], year: number, self: T.IVanillaCalendar) => void;
  onClickTitle: (e: MouseEvent, self: T.IVanillaCalendar) => void;
  onClickMonth: (e: MouseEvent, self: T.IVanillaCalendar) => void;
  onClickYear: (e: MouseEvent, self: T.IVanillaCalendar) => void;
  onClickArrow: (e: MouseEvent, self: T.IVanillaCalendar) => void;
  onChangeTime: (e: Event, self: T.IVanillaCalendar, isError: boolean) => void;
  onChangeToInput: (e: Event, self: T.IVanillaCalendar) => void;
  onInit: (self: T.IVanillaCalendar) => void;
  onUpdate: (self: T.IVanillaCalendar) => void;
  onDestroy: (self: T.IVanillaCalendar) => void;
  onShow: (self: T.IVanillaCalendar) => void;
  onHide: (self: T.IVanillaCalendar) => void;

  popups: T.IPopups;
  labels: T.Labels;
  layouts: T.ILayouts;
  styles: T.Styles;

  init: () => () => void;
  update: (reset?: T.IReset) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;

  readonly private: T.IPrivateVariables;
}

export = VanillaCalendar;
