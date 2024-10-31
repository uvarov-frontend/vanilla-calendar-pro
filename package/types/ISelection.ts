export interface ISelection {
  day: false | 'single' | 'multiple' | 'multiple-ranged';
  month: boolean | 'only-arrows';
  year: boolean | 'only-arrows';
  time: false | 12 | 24;
  controlTime: 'all' | 'range';
  stepHours: number;
  stepMinutes: number;
}
