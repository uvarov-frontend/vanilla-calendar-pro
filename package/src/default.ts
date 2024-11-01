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

  settings: T.ISettings = {
    range: {
      hourMin: 0,
      hourMax: 23,
      minuteMin: 0,
      minuteMax: 59,
    },
    selection: {
      day: 'single',
      month: true,
      year: true,
      time: false,
      controlTime: 'all',
      stepHours: 1,
      stepMinutes: 1,
    },
    selected: {
      dates: undefined,
      month: undefined,
      year: undefined,
      holidays: undefined,
      weekend: [0, 6],
      time: undefined,
    },
    visibility: {
      theme: 'system',
    },
  };

  sanitizerHTML = (dirtyHtml: string) => dirtyHtml;
  onClickDate!: T.IActions['onClickDate'];
  onClickWeekDay!: T.IActions['onClickWeekDay'];
  onClickWeekNumber!: T.IActions['onClickWeekNumber'];
  onClickTitle!: T.IActions['onClickTitle'];
  onClickMonth!: T.IActions['onClickMonth'];
  onClickYear!: T.IActions['onClickYear'];
  onClickArrow!: T.IActions['onClickArrow'];
  onChangeTime!: T.IActions['onChangeTime'];
  onChangeToInput!: T.IActions['onChangeToInput'];
  onInit!: T.IActions['onInit'];
  onUpdate!: T.IActions['onUpdate'];
  onDestroy!: T.IActions['onDestroy'];
  onShow!: T.IActions['onShow'];
  onHide!: T.IActions['onHide'];
  labels: T.Labels = { ...labels };
  styles: T.Styles = { ...styles };
  popups: T.IPopups = {};
  layouts: T.ILayouts = {
    default: '',
    multiple: '',
    month: '',
    year: '',
  };
  private!: T.IPrivateVariables;
}
