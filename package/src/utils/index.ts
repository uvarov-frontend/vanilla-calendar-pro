import getDateOriginal from '@scripts/utils/getDate';
import getDateStringOriginal from '@scripts/utils/getDateString';
import getWeekNumberOriginal from '@scripts/utils/getWeekNumber';
import parseDatesOriginal from '@scripts/utils/parseDates';
import type { FormatDateString, WeekDayID } from '@src/types';

export const parseDates = (dates: string[]) => parseDatesOriginal(dates);

export const getDateString = (date: Date) => getDateStringOriginal(date);

export const getDate = (date: FormatDateString) => getDateOriginal(date);

export const getWeekNumber = (date: FormatDateString, weekStartDay: WeekDayID) => getWeekNumberOriginal(date, weekStartDay);
