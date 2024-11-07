import { destroy, hide, init, set, show, update } from '@scripts/methods';
import errorMessages from '@scripts/utils/getErrorMessages';
import replaceProperties from '@scripts/utils/replaceProperties';
import setContext from '@scripts/utils/setContext';
import OptionsCalendar from '@src/options';
import type {
  ContextVariables,
  DateAny,
  DateMode,
  DatesArr,
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
  PositionToInput,
  Range,
  Reset,
  Styles,
  ThemesDefault,
  TimePicker,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
  WeekDays,
} from '@src/types';

export class Calendar extends OptionsCalendar {
  private static memoizedElements: Map<string, HTMLElement> = new Map();

  constructor(selector: HTMLElement | string, options?: Options) {
    super();

    this.context = {
      ...this.context,
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

    setContext(this, 'mainElement', typeof selector === 'string' ? (Calendar.memoizedElements.get(selector) ?? this.queryAndMemoize(selector)) : selector);

    if (options) replaceProperties(this, options);
  }

  private queryAndMemoize(selector: string) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(errorMessages.notFoundSelector(selector));

    Calendar.memoizedElements.set(selector, element);
    return element;
  }

  init = () => init(this);

  update = (resetOptions?: Partial<Reset>) => update(this, resetOptions);

  destroy = () => destroy(this);

  show = () => show(this);

  hide = () => hide(this);

  set = (options: Options, resetOptions?: Partial<Reset>) => set(this, options, resetOptions);

  readonly context!: Readonly<ContextVariables>;
}

export {
  DateAny,
  DateMode,
  DatesArr,
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
  PositionToInput,
  ContextVariables,
  Range,
  Reset,
  Styles,
  ThemesDefault,
  TimePicker,
  ToggleSelected,
  TypesCalendar,
  WeekDayID,
  WeekDays,
};
