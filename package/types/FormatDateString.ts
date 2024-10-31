type LeadingZero = `${0}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

type MM = LeadingZero | 10 | 11 | 12;

type DD = LeadingZero | `${1 | 2}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | 30 | 31;

export type FormatDateString = `${number}-${MM}-${DD}`;
