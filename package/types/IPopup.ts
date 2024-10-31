import type { FormatDateString } from '../types';

export type IPopup = {
  modifier?: string;
  html?: string;
};

export type IPopups = {
  [date in FormatDateString]: IPopup;
};
