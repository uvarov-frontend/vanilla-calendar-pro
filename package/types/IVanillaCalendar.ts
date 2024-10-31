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

  readonly private: IPrivateVariables;
}
