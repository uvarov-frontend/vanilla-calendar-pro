import labels from '@package/labels';
import styles from '@package/styles';
import type * as T from '@package/types';

export default class DefaultOptionsCalendar {
  constructor() {
    this.private = {
      ...this.private,
      locale: {
        months: {
          short: [],
          long: [],
        },
        weekdays: {
          short: [],
          long: [],
        },
      },
    };
  }

  viewType: T.TypesCalendar = 'default';

  isInput = false;
  positionToInput: 'auto' | 'center' | 'left' | 'right' | ['bottom' | 'top', 'center' | 'left' | 'right'] = 'left';

  firstWeekday: T.WeekDayID = 1;
  monthsToSwitch = 1;
  themeAttrDetect = 'html[data-theme]';

  locale: T.Locale = 'en';

  dateToday = new Date();
  dateMin: T.FormatDateString | 'today' = '1970-01-01';
  dateMax: T.FormatDateString | 'today' = '2470-12-31';

  displayMonthsCount = 2;
  displayDateMin!: T.FormatDateString | 'today';
  displayDateMax!: T.FormatDateString | 'today';
  displayDatesOutside = true;
  displayDisabledDates = false;

  disableDates: Array<Date | number | string> = [];
  disableAllDates = false;
  disableDatesPast = false;
  disableDatesGaps = false;
  disableWeekdays: number[] = [];
  disableToday = false;

  enableDates: Array<Date | number | string> = [];
  enableEdgeDatesOnly = true;
  enableDateToggle: T.ToggleSelected = true;
  enableWeekNumbers = false;
  enableMonthChangeOnDayClick = true;
  enableJumpToSelectedDate = false;

  selectionDatesMode: false | 'single' | 'multiple' | 'multiple-ranged' = 'single';
  selectionMonthsMode: boolean | 'only-arrows' = true;
  selectionYearsMode: boolean | 'only-arrows' = true;
  selectionTimeMode: false | 12 | 24 = false;

  selectedDates: Array<Date | number | string> = [];
  selectedMonth!: number;
  selectedYear!: number;
  selectedHolidays: Array<Date | number | string> = [];
  selectedWeekends: T.WeekDays<T.WeekDayID> = [0, 6];
  selectedTime!: string;
  selectedTheme: 'light' | 'dark' | 'system' | string = 'system';

  timeMinHour: T.Range<24> = 0;
  timeMaxHour: T.Range<24> = 23;
  timeMinMinute: T.Range<60> = 0;
  timeMaxMinute: T.Range<60> = 59;
  timeControls: 'all' | 'range' = 'all';
  timeStepHour: number = 1;
  timeStepMinute: number = 1;

  sanitizerHTML = (dirtyHtml: string) => dirtyHtml;

  onClickDate!: T.IVanillaCalendar['onClickDate'];
  onClickWeekDay!: T.IVanillaCalendar['onClickWeekDay'];
  onClickWeekNumber!: T.IVanillaCalendar['onClickWeekNumber'];
  onClickTitle!: T.IVanillaCalendar['onClickTitle'];
  onClickMonth!: T.IVanillaCalendar['onClickMonth'];
  onClickYear!: T.IVanillaCalendar['onClickYear'];
  onClickArrow!: T.IVanillaCalendar['onClickArrow'];
  onChangeTime!: T.IVanillaCalendar['onChangeTime'];
  onChangeToInput!: T.IVanillaCalendar['onChangeToInput'];
  onInit!: T.IVanillaCalendar['onInit'];
  onUpdate!: T.IVanillaCalendar['onUpdate'];
  onDestroy!: T.IVanillaCalendar['onDestroy'];
  onShow!: T.IVanillaCalendar['onShow'];
  onHide!: T.IVanillaCalendar['onHide'];

  popups: T.IPopups = {};
  labels: T.Labels = { ...labels };
  layouts: T.ILayouts = { default: '', multiple: '', month: '', year: '' };
  styles: T.Styles = { ...styles };

  private!: T.IPrivateVariables;
}
