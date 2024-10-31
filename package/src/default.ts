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

  input = false;
  type: T.TypesCalendar = 'default';
  months = 2;
  jumpMonths = 1;
  jumpToSelectedDate = false;
  toggleSelected: T.ToggleSelected = true;
  weekStartDay: T.WeekDayID = 1;
  switchMonthForDate = true;
  date: T.IDates = {
    min: '1970-01-01',
    max: '2470-12-31',
    today: new Date(),
  };
  settings: T.ISettings = {
    range: {
      min: undefined,
      max: undefined,
      disablePast: false,
      disableGaps: false,
      edgesOnly: true,
      disableAllDays: false,
      disableWeekday: undefined,
      disabled: undefined,
      enabled: undefined,
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
      themeDetect: 'html[data-theme]',
      weekNumbers: false,
      today: true,
      disabled: false,
      daysOutside: true,
      positionToInput: 'left',
    },
  };

  locale: T.Locale = 'en';
  labels: T.Labels = { ...labels };
  styles: T.Styles = { ...styles };

  sanitizerHTML = (dirtyHtml: string) => dirtyHtml;

  actions: T.IActions = {
    clickDay: null,
    clickWeekNumber: null,
    clickWeekDay: null,
    clickMonth: null,
    clickYear: null,
    clickArrow: null,
    clickTitle: null,
    changeTime: null,
    changeToInput: null,
    getDays: null,
    getMonths: null,
    getYears: null,
    initCalendar: null,
    updateCalendar: null,
    destroyCalendar: null,
    showCalendar: null,
    hideCalendar: null,
  };
  popups: T.IPopups = {};

  layouts: T.ILayouts = {
    default: '',
    multiple: '',
    month: '',
    year: '',
  };

  rangeDisabled!: T.FormatDateString[];
  rangeEnabled!: T.FormatDateString[];
  selectedDates!: T.FormatDateString[];
  selectedMonth!: number;
  selectedYear!: number;
  selectedHours!: string;
  selectedMinutes!: string;
  selectedKeeping!: string;
  selectedTime!: string;
  viewYear!: number;

  private!: T.IPrivateVariables;
}