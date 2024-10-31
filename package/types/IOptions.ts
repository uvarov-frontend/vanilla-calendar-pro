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
  MonthsCount,
  Styles,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
} from '../types';

export interface IOptions extends IActions {
  viewType?: TypesCalendar;
  isInput?: boolean;
  displayMonthsCount?: MonthsCount;
  monthsToSwitch?: number;
  enableJumpToSelectedDate?: boolean;
  enableDateToggle?: ToggleSelected;
  firstWeekday?: WeekDayID;
  enableMonthChangeOnDayClick?: boolean;

  date?: Partial<IDates>;
  settings?: Partial<{
    range: Partial<IRange>;
    selection: Partial<ISelection>;
    selected: Partial<ISelected>;
    visibility: Partial<IVisibility>;
  }>;

  sanitizerHTML?: (dirtyHtml: string) => unknown;
  popups?: IPopups;
  locale?: Locale;
  labels?: Partial<Labels>;
  layouts?: Partial<ILayouts>;
  styles?: Partial<Styles>;
}
