import getDateOriginal from '@scripts/utils/getDate';
import getDateStringOriginal from '@scripts/utils/getDateString';
import parseDatesOriginal from '@scripts/utils/parseDates';
import type { FormatDateString } from '@src/types';

export const parseDates = (dates: string[]) => parseDatesOriginal(dates);

export const getDateString = (date: Date) => getDateStringOriginal(date);

export const getDate = (date: FormatDateString) => getDateOriginal(date);
