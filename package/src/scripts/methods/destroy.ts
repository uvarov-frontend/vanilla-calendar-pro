import { clearDateRules } from '@scripts/creators/createDates/dateRules';
import { cleanupDateRange } from '@scripts/handles/handleSelectDateRange/handleSelectDateRange';
import { cancelPendingShow } from '@scripts/methods/show';
import errorMessages from '@scripts/utils/getErrorMessages';
import { clearRenderState } from '@scripts/utils/renderState';
import setContext from '@scripts/utils/setContext';
import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

const destroy = (self: Calendar) => {
  if (!self.context.isInit) throw new Error(errorMessages.notInit);
  if (self.context.isDestroyed) throw new Error(errorMessages.alreadyDestroyed);

  clearRenderState(self);
  const extensions = getExtensions(self);
  extensions.motion?.destroy(self);
  extensions.time?.destroy(self);
  extensions.annotations?.destroy(self);
  cleanupDateRange(self);
  clearDateRules(self);
  cancelPendingShow(self);
  self.context.cleanupInput?.();
  setContext(self, 'cleanupInput', undefined);
  self.context.cleanupHandlers?.forEach((cleanup) => cleanup());
  setContext(self, 'cleanupHandlers', []);
  setContext(self, 'isShowInInputMode', false);
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
