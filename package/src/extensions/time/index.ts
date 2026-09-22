import type { CalendarExtension, TimeExtension } from '@src/extension';
import ControlTime from './ControlTime';
import createTime, { cleanupTime } from './create';
import initTime from './init';

/** The 12/24-hour time editor. Configuration stays on Calendar. */
export const time: CalendarExtension = /* @__PURE__ */ Object.freeze({
  name: 'time',
  component: ControlTime,
  init: initTime,
  render: createTime,
  destroy: cleanupTime,
} satisfies TimeExtension) as unknown as CalendarExtension;
