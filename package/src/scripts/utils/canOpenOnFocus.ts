import resolveToggle from '@scripts/utils/resolveToggle';
import type { Calendar } from '@src/index';

const canOpenOnFocus = (self: Calendar): boolean => {
  return resolveToggle(self, self.openOnFocus);
};

export default canOpenOnFocus;
