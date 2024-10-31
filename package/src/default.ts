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
  displayMonthsCount = 2;
  monthsToSwitch = 1;
  enableJumpToSelectedDate = false;
  enableDateToggle: T.ToggleSelected = true;
  firstWeekday: T.WeekDayID = 1;
  enableMonthChangeOnDayClick = true;
  dateToday = new Date();
  dateMin: T.FormatDateString | 'today' = '1970-01-01';
  dateMax: T.FormatDateString | 'today' = '2470-12-31';

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
