import type { Calendar, ToggleSelected } from '@src/index';

const resolveToggle = (self: Calendar, value?: ToggleSelected): boolean => {
  if (value !== undefined) return typeof value === 'function' ? value(self) : value;
  return true;
};

export default resolveToggle;
