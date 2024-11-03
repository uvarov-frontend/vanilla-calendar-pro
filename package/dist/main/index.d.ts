import { default as OptionsCalendar } from '../types/options';
import { Dates, FormatDateString, HtmlElementPosition, Labels, Layouts, Locale, LocaleStated, MonthsCount, Options, Popup, Popups, Positions, PrivateVariables, Range, Reset, Styles, ToggleSelected, TypesCalendar, WeekDayID, WeekDays } from '../types/types';
export declare class VanillaCalendarPro extends OptionsCalendar {
    private static memoizedElements;
    constructor(selector: HTMLElement | string, options?: Options);
    private queryAndMemoize;
    init: () => () => void;
    update: (resetOptions?: Partial<Reset>) => void;
    destroy: () => void;
    show: () => void;
    hide: () => void;
    set: (options: Options, resetOptions?: Partial<Reset>) => void;
    private: PrivateVariables;
}
export { Dates, FormatDateString, HtmlElementPosition, Labels, Layouts, Locale, LocaleStated, MonthsCount, Options, Popup, Popups, Positions, PrivateVariables, Range, Reset, Styles, ToggleSelected, TypesCalendar, WeekDayID, WeekDays, };
