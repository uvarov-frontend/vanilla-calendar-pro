import type { FormatDateString } from '@package/types';
import getDateOriginal from '@scripts/helpers/getDate';
import getDateStringOriginal from '@scripts/helpers/getDateString';
import parseDatesOriginal from '@scripts/helpers/parseDates';

export const parseDates = (dates: string[]) => parseDatesOriginal(dates);

export const getDateString = (date: Date) => getDateStringOriginal(date);

export const getDate = (date: FormatDateString) => getDateOriginal(date);
