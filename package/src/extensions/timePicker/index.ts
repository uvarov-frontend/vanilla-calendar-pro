import type { CalendarExtension, TimePickerExtension } from '@src/extension';
import ControlTime from './ControlTime';
import createTime, { cleanupTime } from './create';
import initTime from './init';

/** The 12/24-hour time editor. Configuration stays on Calendar. */
export const timePicker: CalendarExtension = /* @__PURE__ */ Object.freeze({
  name: 'timePicker',
  component: ControlTime,
  init: initTime,
  render: createTime,
  destroy: cleanupTime,
} satisfies TimePickerExtension) as unknown as CalendarExtension;
