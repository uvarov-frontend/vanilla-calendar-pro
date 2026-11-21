import type { Calendar } from '@src/index';

// The field can be disabled while its popup is open, directly or through a disabled fieldset; it must not take a new value then.
const isInputLocked = (self: Calendar) => self.inputMode && self.context.inputElement?.matches(':disabled') === true;

export default isInputLocked;
