import type { VanillaCalendarPro } from '@src/index';
import labels from '@src/labels';
import styles from '@src/styles';
import type {
  DateAny,
  DateMode,
  DatesArr,
  Labels,
  Layouts,
  Locale,
  MonthsCount,
  Popups,
  PositionToInput,
  Range,
  Styles,
  ThemesDefault,
  TimeControl,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
  WeekDays,
} from '@src/types';

export default class OptionsCalendar {
  viewType: TypesCalendar = 'default';

  isInput: boolean = false;
  positionToInput: PositionToInput = 'left';

  firstWeekday: WeekDayID = 1;
  monthsToSwitch: 1 | MonthsCount = 1;
  themeAttrDetect: string | false = 'html[data-theme]';

  locale: Locale = 'en';

  dateToday: DateAny = 'today';
  dateMin: DateAny = '1970-01-01';
  dateMax: DateAny = '2470-12-31';

  displayDateMin!: DateAny;
  displayDateMax!: DateAny;
  displayDatesOutside: boolean = true;
  displayDisabledDates: boolean = false;
  displayMonthsCount: MonthsCount = 2;

  disableDates: DatesArr = [];
  disableAllDates: boolean = false;
  disableDatesPast: boolean = false;
  disableDatesGaps: boolean = false;
  disableWeekdays: Range<7>[] = [];
  disableToday: boolean = false;

  enableDates: DatesArr = [];
  enableEdgeDatesOnly: boolean = true;
  enableDateToggle: ToggleSelected = true;
  enableWeekNumbers: boolean = false;
  enableMonthChangeOnDayClick: boolean = true;
  enableJumpToSelectedDate: boolean = false;

  selectionDatesMode: false | DateMode = 'single';
  selectionMonthsMode: boolean | 'only-arrows' = true;
  selectionYearsMode: boolean | 'only-arrows' = true;
  selectionTimeMode: false | 12 | 24 = false;

  selectedDates: DatesArr = [];
  selectedMonth!: Range<12>;
  selectedYear!: number;
  selectedHolidays: DatesArr = [];
  selectedWeekends: WeekDays<WeekDayID> = [0, 6];
  selectedTime!: string;
  selectedTheme: ThemesDefault | string = 'system';

  timeMinHour: Range<24> = 0;
  timeMaxHour: Range<24> = 23;
  timeMinMinute: Range<60> = 0;
  timeMaxMinute: Range<60> = 59;
  timeControls: TimeControl = 'all';
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
