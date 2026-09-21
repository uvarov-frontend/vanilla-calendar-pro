import { Calendar as CoreCalendar, datePopups, motion, type Options, timePicker } from './index';

export * from './index';

const extensions = [motion, timePicker, datePopups];

/** The classic script/CommonJS distribution preserves automatic feature availability. */
export class Calendar extends CoreCalendar {
  constructor(selector: HTMLElement | string, options?: Options) {
    super(selector, { extensions, ...options });
  }
}
