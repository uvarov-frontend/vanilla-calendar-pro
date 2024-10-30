import errorMessages from '@scripts/utils/getErrorMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const destroy = (self: VanillaCalendar) => {
  if (!self.isInit) throw new Error(errorMessages.notInit);

  if (self.input) {
    self.HTMLElement.parentElement?.removeChild(self.HTMLElement);
    self.HTMLInputElement?.replaceWith?.(self.HTMLOriginalElement);
    self.HTMLInputElement = undefined;
  } else {
    self.HTMLElement.replaceWith?.(self.HTMLOriginalElement);
  }

  self.HTMLElement = self.HTMLOriginalElement;
  if (self.actions.destroyCalendar) self.actions.destroyCalendar(self);
};

export default destroy;
