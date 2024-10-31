import type { IVanillaCalendar } from '../types';

export type ToggleSelected = boolean | ((self: IVanillaCalendar) => boolean);
