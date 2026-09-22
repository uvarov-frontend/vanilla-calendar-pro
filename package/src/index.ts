import { destroy, hide, init, set, show, update } from '@scripts/methods';
import errorMessages from '@scripts/utils/getErrorMessages';
import replaceProperties from '@scripts/utils/replaceProperties';
import setContext from '@scripts/utils/setContext';
import { type CalendarExtension, noExtensions, registerExtensions } from '@src/extension';
import OptionsCalendar from '@src/options';
import type {
  AnimationOptions,
  AnimationTiming,
  ContextVariables,
  DateAny,
  DateMode,
  DatesArr,
  FormatDateString,
  HtmlElementPosition,
  Labels,
  LabelsOptions,
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
  readonly extensions: readonly CalendarExtension[];

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

    const extensions = options?.extensions;
    this.extensions = extensions?.length ? Object.freeze(Array.from(new Set(extensions))) : noExtensions;
    registerExtensions(this);
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

  destroy = () => {
    const staleElement = this.inputMode ? this.context.inputElement : this.context.mainElement;
    destroy(this);
    if (staleElement) {
      for (const [selector, element] of Calendar.memoizedElements) {
        if (element === staleElement) Calendar.memoizedElements.delete(selector);
      }
    }
  };

  show = () => show(this);

  hide = () => hide(this);

  set = (options: Options, resetOptions?: Partial<Reset>) => set(this, options, resetOptions);

  readonly context!: Readonly<ContextVariables>;
}

export type { CalendarExtension } from '@src/extension';
export { annotations } from '@src/extensions/annotations';
export { months } from '@src/extensions/months';
export { motion } from '@src/extensions/motion';
export { time } from '@src/extensions/time';
export { weeks } from '@src/extensions/weeks';

export type {
  AnimationOptions,
  AnimationTiming,
  ContextVariables,
  DateAny,
  DateMode,
  DatesArr,
  FormatDateString,
  HtmlElementPosition,
  Labels,
  LabelsOptions,
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
};
