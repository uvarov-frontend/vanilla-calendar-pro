import errorMessages from '@scripts/utils/getErrorMessages';
import type { VanillaCalendar } from '@src/vanilla-calendar';

const destroy = (self: VanillaCalendar) => {
  if (!self.private.isInit) throw new Error(errorMessages.notInit);

  if (self.isInput) {
    self.private.mainElement.parentElement?.removeChild(self.private.mainElement);
    self.private.inputElement?.replaceWith?.(self.private.originalElement);
    self.private.inputElement = undefined;
  } else {
    self.private.mainElement.replaceWith?.(self.private.originalElement);
  }

  self.private.mainElement = self.private.originalElement;
  if (self.onDestroy) self.onDestroy(self);
};

export default destroy;
