import type { FormatDateString } from '@package/types';
import getDateOriginal from '@scripts/utils/getDate';
import getDateStringOriginal from '@scripts/utils/getDateString';
import parseDatesOriginal from '@scripts/utils/parseDates';

export const parseDates = (dates: string[]) => parseDatesOriginal(dates);

export const getDateString = (date: Date) => getDateStringOriginal(date);

export const getDate = (date: FormatDateString) => getDateOriginal(date);
