import errorMessages from '@scripts/utils/getErrorMessages';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const destroy = (self: Calendar) => {
  if (!self.context.isInit) throw new Error(errorMessages.notInit);

  if (self.inputMode) {
    self.context.mainElement.parentElement?.removeChild(self.context.mainElement);
    self.context.inputElement?.replaceWith?.(self.context.originalElement);
    setContext(self, 'inputElement', undefined);
  } else {
    self.context.mainElement.replaceWith?.(self.context.originalElement);
  }

  setContext(self, 'mainElement', self.context.originalElement);
  if (self.onDestroy) self.onDestroy(self);
};

export default destroy;
