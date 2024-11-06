import errorMessages from '@scripts/utils/getErrorMessages';
import type { VanillaCalendarPro } from '@src/index';

const destroy = (self: VanillaCalendarPro) => {
  if (!self.context.isInit) throw new Error(errorMessages.notInit);

  if (self.inputMode) {
    self.context.mainElement.parentElement?.removeChild(self.context.mainElement);
    self.context.inputElement?.replaceWith?.(self.context.originalElement);
    self.context.inputElement = undefined;
  } else {
    self.context.mainElement.replaceWith?.(self.context.originalElement);
  }

  self.context.mainElement = self.context.originalElement;
  if (self.onDestroy) self.onDestroy(self);
};

export default destroy;
