import type { Calendar } from '@src/index';

const skipOpenOnFocus = new WeakSet<Calendar>();

export const shouldSkipOpenOnFocus = (self: Calendar) => skipOpenOnFocus.has(self);

export const setSkipOpenOnFocus = (self: Calendar) => {
  skipOpenOnFocus.add(self);
};

export const clearSkipOpenOnFocus = (self: Calendar) => {
  skipOpenOnFocus.delete(self);
};
