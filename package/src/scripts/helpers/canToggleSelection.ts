import type VanillaCalendar from '@src/vanilla-calendar';

const canToggleSelection = (self: VanillaCalendar): boolean => {
  if (self.toggleSelected !== undefined) {
    return typeof self.toggleSelected === 'function' ? self.toggleSelected(self) : self.toggleSelected;
  }
  return true;
};

export default canToggleSelection;
