import { FormatDateString } from '../../types';
declare const getWeekNumber: (date: FormatDateString, weekStartDay: number) => {
    year: number;
    week: number;
};
export default getWeekNumber;
