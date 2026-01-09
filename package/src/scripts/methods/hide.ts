import setContext from '@scripts/utils/setContext';
import { setSkipOpenOnFocus } from '@scripts/utils/skipOpenOnFocus';
import { disableTabbing } from '@scripts/utils/toggleTabbing';
import type { Calendar } from '@src/index';

const hide = (self: Calendar) => {
  if (!self.context.isShowInInputMode || !self.context.currentType) return;

  self.context.mainElement.dataset.vcCalendarHidden = '';
  setContext(self, 'isShowInInputMode', false);
  if (self.inputMode) disableTabbing(self.context.mainElement);

  if (self.context.cleanupHandlers[0]) {
    self.context.cleanupHandlers.forEach((cleanup) => cleanup());
    setContext(self, 'cleanupHandlers', []);
  }

  if (self.inputMode && self.context.inputElement && self.context.mainElement.contains(document.activeElement)) {
    const shouldHandleFocus = typeof self.openOnFocus === 'function' || self.openOnFocus === true;
    if (shouldHandleFocus) setSkipOpenOnFocus(self);
    self.context.inputElement.focus();
  }

  if (self.onHide) self.onHide(self);
};

export default hide;
