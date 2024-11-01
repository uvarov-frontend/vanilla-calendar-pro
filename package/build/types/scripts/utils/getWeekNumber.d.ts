import type { FormatDateString } from '@src/types';
declare const getWeekNumber: (date: FormatDateString, weekStartDay: number) => {
    year: number;
    week: number;
};
export default getWeekNumber;
