import { default as OptionsCalendar } from './options';
import { Dates, FormatDateString, HtmlElementPosition, Labels, Layouts, Locale, LocaleStated, MonthsCount, Options, Popup, Popups, Positions, PrivateVariables, Range, Reset, Styles, ToggleSelected, TypesCalendar, WeekDayID, WeekDays } from './types';
export declare class VanillaCalendarPro extends OptionsCalendar {
    private static memoizedElements;
    constructor(selector: HTMLElement | string, options?: Options);
    private queryAndMemoize;
    private applyOptions;
    init: () => () => void;
    update: (reset?: Reset) => void;
    destroy: () => void;
    show: () => void;
    hide: () => void;
    set: (options: Options) => void;
    private: PrivateVariables;
}
export { Dates, FormatDateString, HtmlElementPosition, Labels, Layouts, Locale, LocaleStated, MonthsCount, Options, Popup, Popups, Positions, PrivateVariables, Range, Reset, Styles, ToggleSelected, TypesCalendar, WeekDayID, WeekDays, };
