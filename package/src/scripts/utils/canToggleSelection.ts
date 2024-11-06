import type { Calendar } from '@src/index';

const canToggleSelection = (self: Calendar): boolean => {
  if (self.enableDateToggle !== undefined) return typeof self.enableDateToggle === 'function' ? self.enableDateToggle(self) : self.enableDateToggle;
  return true;
};

export default canToggleSelection;
