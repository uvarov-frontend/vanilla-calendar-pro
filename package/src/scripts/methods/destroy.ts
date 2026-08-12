import errorMessages from '@scripts/utils/getErrorMessages';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const destroy = (self: Calendar) => {
  if (!self.context.isInit) throw new Error(errorMessages.notInit);
  if (self.context.isDestroyed) throw new Error(errorMessages.alreadyDestroyed);

  self.context.cleanupSystemTheme?.();

  if (self.inputMode) {
    if (self.context.mainElement !== self.context.inputElement) {
      self.context.mainElement.parentElement?.removeChild(self.context.mainElement);
    }
    self.context.inputElement?.replaceWith?.(self.context.originalElement);
    setContext(self, 'inputElement', undefined);
  } else {
    self.context.mainElement.replaceWith?.(self.context.originalElement);
  }

  setContext(self, 'mainElement', self.context.originalElement);
  setContext(self, 'isDestroyed', true);
  if (self.onDestroy) self.onDestroy(self);
};

export default destroy;
