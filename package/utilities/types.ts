import { FormatDateString } from '../types';

export type parseDates = (dates: string[]) => FormatDateString[];
export type getDateString = (date: Date) => FormatDateString;
export type getDate = (date: FormatDateString) => Date;
