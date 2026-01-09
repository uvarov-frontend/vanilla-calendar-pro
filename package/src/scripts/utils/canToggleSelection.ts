import resolveToggle from '@scripts/utils/resolveToggle';
import type { Calendar } from '@src/index';

const canToggleSelection = (self: Calendar): boolean => {
  return resolveToggle(self, self.enableDateToggle);
};

export default canToggleSelection;
