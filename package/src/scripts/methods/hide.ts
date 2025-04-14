import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const hide = (self: Calendar) => {
  if (!self.context.isShowInInputMode || !self.context.currentType) return;

  self.context.mainElement.dataset.vcCalendarHidden = '';
  setContext(self, 'isShowInInputMode', false);

  if (self.context.cleanupHandlers[0]) {
    self.context.cleanupHandlers.forEach((cleanup) => cleanup());
    setContext(self, 'cleanupHandlers', []);
  }

  if (self.onHide) self.onHide(self);
};

export default hide;
