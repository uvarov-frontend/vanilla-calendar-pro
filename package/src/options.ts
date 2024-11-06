import type { Calendar } from '@src/index';
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
  type: TypesCalendar = 'default';

  inputMode: boolean = false;
  positionToInput: PositionToInput = 'left';

  firstWeekday: WeekDayID = 1;
  monthsToSwitch: 1 | MonthsCount = 1;
  themeAttrDetect: string = 'html[data-theme]';

  locale: Locale = 'en';

  dateToday: DateAny = 'today';
  dateMin: DateAny = '1970-01-01';
  dateMax: DateAny = '2470-12-31';

  displayDateMin!: DateAny;
  displayDateMax!: DateAny;
  displayDatesOutside: boolean = true;
  displayDisabledDates: boolean = false;
  displayMonthsCount!: MonthsCount;

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

  onClickDate!: (self: Calendar, event: MouseEvent) => void;
  onClickWeekDay!: (self: Calendar, day: number, dateEls: HTMLElement[], event: MouseEvent) => void;
  onClickWeekNumber!: (self: Calendar, number: number, year: number, dateEls: HTMLElement[], event: MouseEvent) => void;
  onClickTitle!: (self: Calendar, event: MouseEvent) => void;
  onClickMonth!: (self: Calendar, event: MouseEvent) => void;
  onClickYear!: (self: Calendar, event: MouseEvent) => void;
  onClickArrow!: (self: Calendar, event: MouseEvent) => void;
  onChangeTime!: (self: Calendar, event: Event, isError: boolean) => void;
  onChangeToInput!: (self: Calendar, event: Event) => void;
  onCreateDateRangeTooltip!: (self: Calendar, dateEl: HTMLElement, tooltipEl: HTMLElement, dateElBCR: DOMRect, mainElBCR: DOMRect) => string;
  onCreateDateEls!: (self: Calendar, dateEl: HTMLElement) => void;
  onCreateMonthEls!: (self: Calendar, monthEl: HTMLElement) => void;
  onCreateYearEls!: (self: Calendar, yearEl: HTMLElement) => void;
  onInit!: (self: Calendar) => void;
  onUpdate!: (self: Calendar) => void;
  onDestroy!: (self: Calendar) => void;
  onShow!: (self: Calendar) => void;
  onHide!: (self: Calendar) => void;

  popups: Popups = {};
  labels: Labels = { ...labels };
  layouts: Layouts = { default: '', multiple: '', month: '', year: '' };
  styles: Styles = { ...styles };
}
