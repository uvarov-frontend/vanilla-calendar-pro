import type {
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
  MonthsCount,
  Styles,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
} from '../types';

export interface IVanillaCalendar extends IActions {
  viewType: TypesCalendar;
  isInput: boolean;
  displayMonthsCount: MonthsCount;
  monthsToSwitch: number;
  enableJumpToSelectedDate: boolean;
  enableDateToggle: ToggleSelected;
  firstWeekday: WeekDayID;
  enableMonthChangeOnDayClick: boolean;

  date: IDates;
  settings: {
    range: IRange;
    selection: ISelection;
    selected: ISelected;
    visibility: IVisibility;
  };

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

  readonly private: IPrivateVariables;
}
