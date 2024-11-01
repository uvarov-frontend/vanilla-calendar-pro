import type { VanillaCalendar } from '@src/vanilla-calendar';

const canToggleSelection = (self: VanillaCalendar): boolean => {
  if (self.enableDateToggle !== undefined) return typeof self.enableDateToggle === 'function' ? self.enableDateToggle(self) : self.enableDateToggle;
  return true;
};

export default canToggleSelection;
