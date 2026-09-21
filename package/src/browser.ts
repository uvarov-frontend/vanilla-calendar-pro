import { annotations, Calendar as CoreCalendar, months, motion, type Options, time, weeks } from './index';

export * from './index';

const extensions = [motion, time, annotations, weeks, months];

/** The classic script/CommonJS distribution preserves automatic feature availability. */
export class Calendar extends CoreCalendar {
  constructor(selector: HTMLElement | string, options?: Options) {
    super(selector, { extensions, ...options });
  }
}
