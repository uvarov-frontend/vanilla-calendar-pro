import getRootNode from '@scripts/utils/getRootNode';
import setContext from '@scripts/utils/setContext';
import { setSkipOpenOnFocus } from '@scripts/utils/skipOpenOnFocus';
import { hideFromAT } from '@scripts/utils/toggleTabbing';
import type { Calendar } from '@src/index';

const hide = (self: Calendar) => {
  if (!self.context.isShowInInputMode || !self.context.currentType) return;

  // `inert` blurs whatever it covers, so where the focus stands has to be read before it is set
  const hasFocusInside = self.context.mainElement.contains(getRootNode(self.context.mainElement).activeElement);

  self.context.mainElement.dataset.vcCalendarHidden = '';
  setContext(self, 'isShowInInputMode', false);
  if (self.inputMode) hideFromAT(self.context.mainElement);
  if (self.context.inputElement?.hasAttribute('aria-expanded')) self.context.inputElement.setAttribute('aria-expanded', 'false');

  if (self.context.cleanupHandlers[0]) {
    self.context.cleanupHandlers.forEach((cleanup) => cleanup());
    setContext(self, 'cleanupHandlers', []);
  }

  if (self.inputMode && self.context.inputElement && hasFocusInside) {
    const shouldHandleFocus = typeof self.openOnFocus === 'function' || self.openOnFocus === true;
    if (shouldHandleFocus) setSkipOpenOnFocus(self);
    self.context.inputElement.focus();
  }

  if (self.onHide) self.onHide(self);
};

export default hide;
