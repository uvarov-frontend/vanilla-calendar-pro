export interface IReset {
  year?: boolean;
  month?: boolean;
  dates?: boolean | 'only-first';
  time?: boolean;
  locale?: boolean;
}
