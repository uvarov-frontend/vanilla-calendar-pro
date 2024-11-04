import type { VanillaCalendarPro } from '@src/index';
import labels from '@src/labels';
import styles from '@src/styles';
import type {
  FormatDateString,
  Labels,
  Layouts,
  Locale,
  MonthsCount,
  Popups,
  Range,
  Styles,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
  WeekDays,
} from '@src/types';

export default class OptionsCalendar {
  viewType: TypesCalendar = 'default';

  isInput: boolean = false;
  positionToInput: 'auto' | 'center' | 'left' | 'right' | ['bottom' | 'top', 'center' | 'left' | 'right'] = 'left';

  firstWeekday: WeekDayID = 1;
  monthsToSwitch: number = 1;
  themeAttrDetect: string | false = 'html[data-theme]';

  locale: Locale = 'en';

  dateToday: Date | number | FormatDateString | 'today' = 'today';
  dateMin: Date | number | FormatDateString | 'today' = '1970-01-01';
  dateMax: Date | number | FormatDateString | 'today' = '2470-12-31';

  displayMonthsCount: MonthsCount = 2;
  displayDateMin!: Date | number | FormatDateString | 'today';
  displayDateMax!: Date | number | FormatDateString | 'today';
  displayDatesOutside: boolean = true;
  displayDisabledDates: boolean = false;

  disableDates: Array<Date | number | string> = [];
  disableAllDates: boolean = false;
  disableDatesPast: boolean = false;
  disableDatesGaps: boolean = false;
  disableWeekdays: number[] = [];
  disableToday: boolean = false;

  enableDates: Array<Date | number | string> = [];
  enableEdgeDatesOnly: boolean = true;
  enableDateToggle: ToggleSelected = true;
  enableWeekNumbers: boolean = false;
  enableMonthChangeOnDayClick: boolean = true;
  enableJumpToSelectedDate: boolean = false;

  selectionDatesMode: false | 'single' | 'multiple' | 'multiple-ranged' = 'single';
  selectionMonthsMode: boolean | 'only-arrows' = true;
  selectionYearsMode: boolean | 'only-arrows' = true;
  selectionTimeMode: false | 12 | 24 = false;

  selectedDates: Array<Date | number | string> = [];
  selectedMonth!: number;
  selectedYear!: number;
  selectedHolidays: Array<Date | number | string> = [];
  selectedWeekends: WeekDays<WeekDayID> = [0, 6];
  selectedTime!: string;
  selectedTheme: 'light' | 'dark' | 'system' | string = 'system';

  timeMinHour: Range<24> = 0;
  timeMaxHour: Range<24> = 23;
  timeMinMinute: Range<60> = 0;
  timeMaxMinute: Range<60> = 59;
  timeControls: 'all' | 'range' = 'all';
  timeStepHour: number = 1;
  timeStepMinute: number = 1;

  sanitizerHTML: (dirtyHtml: string) => string = (dirtyHtml: string) => dirtyHtml;

  onClickDate!: (e: MouseEvent, self: VanillaCalendarPro) => void;
  onClickWeekDay!: (e: MouseEvent, day: number, days: HTMLElement[], self: VanillaCalendarPro) => void;
  onClickWeekNumber!: (e: MouseEvent, number: number, days: HTMLElement[], year: number, self: VanillaCalendarPro) => void;
  onClickTitle!: (e: MouseEvent, self: VanillaCalendarPro) => void;
  onClickMonth!: (e: MouseEvent, self: VanillaCalendarPro) => void;
  onClickYear!: (e: MouseEvent, self: VanillaCalendarPro) => void;
  onClickArrow!: (e: MouseEvent, self: VanillaCalendarPro) => void;
  onChangeTime!: (e: Event, self: VanillaCalendarPro, isError: boolean) => void;
  onChangeToInput!: (e: Event, self: VanillaCalendarPro) => void;
  onCreateDateEls!: (dateEl: HTMLElement, self: VanillaCalendarPro) => void;
  onCreateMonthEls!: (monthEl: HTMLElement, self: VanillaCalendarPro) => void;
  onCreateYearEls!: (yearEl: HTMLElement, self: VanillaCalendarPro) => void;
  onInit!: (self: VanillaCalendarPro) => void;
  onUpdate!: (self: VanillaCalendarPro) => void;
  onDestroy!: (self: VanillaCalendarPro) => void;
  onShow!: (self: VanillaCalendarPro) => void;
  onHide!: (self: VanillaCalendarPro) => void;

  popups: Popups = {};
  labels: Labels = { ...labels };
  layouts: Layouts = { default: '', multiple: '', month: '', year: '' };
  styles: Styles = { ...styles };
}
