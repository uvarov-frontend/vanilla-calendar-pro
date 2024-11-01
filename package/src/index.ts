import { destroy, hide, init, show, update } from '@scripts/methods';
import errorMessages from '@scripts/utils/getErrorMessages';
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

    if (options) this.applyOptions(options);
  }

  private queryAndMemoize(selector: string) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(errorMessages.notFoundSelector(selector));

    VanillaCalendarPro.memoizedElements.set(selector, element);
    return element;
  }

  private applyOptions(options: Options) {
    const replaceProperties = <T extends object>(original: T, replacement: T) => {
      (Object.keys(replacement) as Array<keyof T>).forEach((key) => {
        if (
          typeof original[key] === 'object' &&
          typeof replacement[key] === 'object' &&
          !(replacement[key] instanceof Date) &&
          !Array.isArray(replacement[key])
        ) {
          replaceProperties(original[key] as object, replacement[key] as object);
        } else if (replacement[key] !== undefined) {
          original[key] = replacement[key];
        }
      });
    };
    replaceProperties(this, options);
  }

  init = () => init(this);

  update = (reset?: Reset) => update(this, reset);

  destroy = () => destroy(this);

  show = () => show(this);

  hide = () => hide(this);

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
