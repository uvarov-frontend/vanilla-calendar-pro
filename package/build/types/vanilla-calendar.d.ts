import OptionsCalendar from '@src/options';
import type * as T from '@src/types';
export default class VanillaCalendar extends OptionsCalendar {
    private static memoizedElements;
    constructor(selector: HTMLElement | string, options?: T.Options);
    private queryAndMemoize;
    private applyOptions;
    init: () => () => void;
    update: (reset?: T.Reset) => void;
    destroy: () => void;
    show: () => void;
    hide: () => void;
    private: T.PrivateVariables;
}
