import { default as OptionsCalendar } from './options';
import { Options, PrivateVariables, Reset } from './types';
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
    private: PrivateVariables;
}
