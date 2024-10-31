export type Locale = string | ILocale;

export interface ILocale {
  months: {
    long: string[];
    short: string[];
  };
  weekdays: {
    long: string[];
    short: string[];
  };
}
