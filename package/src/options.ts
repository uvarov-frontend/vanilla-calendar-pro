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
import type { VanillaCalendar } from '@src/vanilla-calendar';

export default class OptionsCalendar {
  viewType: TypesCalendar = 'default';

  isInput: boolean = false;
  positionToInput: 'auto' | 'center' | 'left' | 'right' | ['bottom' | 'top', 'center' | 'left' | 'right'] = 'left';

  firstWeekday: WeekDayID = 1;
  monthsToSwitch: number = 1;
  themeAttrDetect: string | false = 'html[data-theme]';

  locale: Locale = 'en';

  dateToday: Date = new Date();
  dateMin: FormatDateString | 'today' = '1970-01-01';
  dateMax: FormatDateString | 'today' = '2470-12-31';

  displayMonthsCount: MonthsCount = 2;
  displayDateMin!: FormatDateString | 'today';
  displayDateMax!: FormatDateString | 'today';
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

  onClickDate!: (e: MouseEvent, self: VanillaCalendar) => void;
  onClickWeekDay!: (e: MouseEvent, day: number, days: HTMLElement[], self: VanillaCalendar) => void;
  onClickWeekNumber!: (e: MouseEvent, number: number, days: HTMLElement[], year: number, self: VanillaCalendar) => void;
  onClickTitle!: (e: MouseEvent, self: VanillaCalendar) => void;
  onClickMonth!: (e: MouseEvent, self: VanillaCalendar) => void;
  onClickYear!: (e: MouseEvent, self: VanillaCalendar) => void;
  onClickArrow!: (e: MouseEvent, self: VanillaCalendar) => void;
  onChangeTime!: (e: Event, self: VanillaCalendar, isError: boolean) => void;
  onChangeToInput!: (e: Event, self: VanillaCalendar) => void;
  onInit!: (self: VanillaCalendar) => void;
  onUpdate!: (self: VanillaCalendar) => void;
  onDestroy!: (self: VanillaCalendar) => void;
  onShow!: (self: VanillaCalendar) => void;
  onHide!: (self: VanillaCalendar) => void;

  popups: Popups = {};
  labels: Labels = { ...labels };
  layouts: Layouts = { default: '', multiple: '', month: '', year: '' };
  styles: Styles = { ...styles };
}
