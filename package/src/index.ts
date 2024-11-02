import { destroy, hide, init, set, show, update } from '@scripts/methods';
import errorMessages from '@scripts/utils/getErrorMessages';
import replaceProperties from '@scripts/utils/replaceProperties';
import OptionsCalendar from '@src/options';
import type {
  Dates,
  FormatDateString,
  HtmlElementPosition,
  Labels,
  Layouts,
  Locale,
  LocaleStated,
  MonthsCount,
  Options,
  Popup,
  Popups,
  Positions,
  PrivateVariables,
  Range,
  Reset,
  Styles,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
  WeekDays,
} from '@src/types';

export class VanillaCalendarPro extends OptionsCalendar {
  private static memoizedElements: Map<string, HTMLElement> = new Map();

  constructor(selector: HTMLElement | string, options?: Options) {
    super();

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

    this.private.mainElement = typeof selector === 'string' ? (VanillaCalendarPro.memoizedElements.get(selector) ?? this.queryAndMemoize(selector)) : selector;

    if (options) replaceProperties(this, options);
  }

  private queryAndMemoize(selector: string) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(errorMessages.notFoundSelector(selector));

    VanillaCalendarPro.memoizedElements.set(selector, element);
    return element;
  }

  init = () => init(this);

  update = (resetOptions?: Partial<Reset>) => update(this, resetOptions);

  destroy = () => destroy(this);

  show = () => show(this);

  hide = () => hide(this);

  set = (options: Options, resetOptions?: Partial<Reset>) => set(this, options, resetOptions);

  private!: PrivateVariables;
}

export {
  Dates,
  FormatDateString,
  HtmlElementPosition,
  Labels,
  Layouts,
  Locale,
  LocaleStated,
  MonthsCount,
  Options,
  Popup,
  Popups,
  Positions,
  PrivateVariables,
  Range,
  Reset,
  Styles,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
  WeekDays,
};
