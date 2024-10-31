import type {
  FormatDateString,
  IActions,
  IDates,
  ILayouts,
  IPopups,
  IPrivateVariables,
  IRange,
  IReset,
  ISelected,
  ISelection,
  IVisibility,
  Labels,
  Locale,
  Styles,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
} from '../types';

export interface IVanillaCalendar {
  input: boolean;
  type: TypesCalendar;
  months: number;
  jumpMonths: number;
  jumpToSelectedDate: boolean;
  toggleSelected: ToggleSelected;
  weekStartDay: WeekDayID;
  switchMonthForDate: boolean;
  date: IDates;
  settings: {
    range: IRange;
    selection: ISelection;
    selected: ISelected;
    visibility: IVisibility;
  };
  actions: IActions;

  sanitizerHTML: (dirtyHtml: string) => unknown;
  locale: Locale;
  labels: Labels;
  layouts: ILayouts;
  styles: Styles;
  popups: IPopups;

  init: () => () => void;
  update: (reset?: IReset) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;

  readonly rangeMin: FormatDateString;
  readonly rangeMax: FormatDateString;
  readonly rangeDisabled: FormatDateString[];
  readonly rangeEnabled: FormatDateString[];
  readonly selectedDates: FormatDateString[];
  readonly selectedMonth: number;
  readonly selectedYear: number;
  readonly selectedHours?: string;
  readonly selectedMinutes?: string;
  readonly selectedKeeping?: string;
  readonly selectedTime?: string;
  readonly viewYear: number;
  readonly dateMin: Date;
  readonly dateMax: Date;

  readonly private: IPrivateVariables;
}
