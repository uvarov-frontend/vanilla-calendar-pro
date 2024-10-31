import type * as T from './types';

declare class VanillaCalendar implements T.IVanillaCalendar {
  constructor(selector: HTMLElement | string, options?: Partial<T.IOptions>);

  viewType: T.TypesCalendar;
  isInput: boolean;
  displayMonthsCount: T.MonthsCount;
  monthsToSwitch: number;
  enableJumpToSelectedDate: boolean;
  enableDateToggle: T.ToggleSelected;
  firstWeekday: T.WeekDayID;
  enableMonthChangeOnDayClick: boolean;

  date: T.IDates;
  settings: {
    range: T.IRange;
    selection: T.ISelection;
    selected: T.ISelected;
    visibility: T.IVisibility;
  };

  sanitizerHTML: (dirtyHtml: string) => unknown;
  locale: T.Locale;
  labels: T.Labels;
  layouts: T.ILayouts;
  styles: T.Styles;
  popups: T.IPopups;

  init: () => () => void;
  update: (reset?: T.IReset) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;

  readonly private: T.IPrivateVariables;
}

export = VanillaCalendar;
