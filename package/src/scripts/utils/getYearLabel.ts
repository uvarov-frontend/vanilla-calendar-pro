import type { Calendar } from '@src/index';

// A locale that names its calendar, such as 'ja-JP-u-ca-japanese', writes the year in that calendar (令和6年).
// The month matters where an era starts during the year.
const getYearLabel = (self: Calendar, year: number, month: number) =>
  String(self.locale).includes('-u-ca-') ? new Date(year, month).toLocaleDateString(self.locale as string, { year: 'numeric' }) : String(year);

export default getYearLabel;
