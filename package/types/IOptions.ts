import type {
  IActions,
  IDates,
  ILayouts,
  IPopups,
  IRange,
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

export interface IOptions {
  input?: boolean;
  type?: TypesCalendar;
  months?: number;
  jumpMonths?: number;
  jumpToSelectedDate?: boolean;
  toggleSelected?: ToggleSelected;
  weekStartDay?: WeekDayID;
  switchMonthForDate?: boolean;
  date?: Partial<IDates>;
  settings?: Partial<{
    range: Partial<IRange>;
    selection: Partial<ISelection>;
    selected: Partial<ISelected>;
    visibility: Partial<IVisibility>;
  }>;
  actions?: Partial<IActions>;

  sanitizerHTML?: (dirtyHtml: string) => unknown;
  popups?: IPopups;
  locale?: Locale;
  labels?: Partial<Labels>;
  layouts?: Partial<ILayouts>;
  styles?: Partial<Styles>;
}
