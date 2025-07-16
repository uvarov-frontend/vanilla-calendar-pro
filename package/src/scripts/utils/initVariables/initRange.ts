import getDate from '@scripts/utils/getDate';
import parseDates from '@scripts/utils/parseDates';
import resolveDate from '@scripts/utils/resolveDate';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const initRange = (self: Calendar) => {
  // set self.context.displayDateMin, self.context.displayDateMax
  const dateMin = resolveDate(self.dateMin, self.dateMin);
  const dateMax = resolveDate(self.dateMax, self.dateMax);
  const displayDateMin = resolveDate(self.displayDateMin, dateMin);
  const displayDateMax = resolveDate(self.displayDateMax, dateMax);

  setContext(self, 'dateToday', resolveDate(self.dateToday, self.dateToday));

  setContext(self, 'displayDateMin', displayDateMin ? (getDate(dateMin) >= getDate(displayDateMin) ? dateMin : displayDateMin) : dateMin);
  setContext(self, 'displayDateMax', displayDateMax ? (getDate(dateMax) <= getDate(displayDateMax) ? dateMax : displayDateMax) : dateMax);

  const isDisablePast = self.disableDatesPast && !self.disableAllDates && getDate(displayDateMin) < getDate(self.context.dateToday);
  setContext(self, 'displayDateMin', isDisablePast ? self.context.dateToday : self.disableAllDates ? self.context.dateToday : displayDateMin);
  setContext(self, 'displayDateMax', self.disableAllDates ? self.context.dateToday : displayDateMax);

  // set self.context.disableDates
  setContext(
    self,
    'disableDates',
    self.disableDates[0] && !self.disableAllDates ? parseDates(self.disableDates) : self.disableAllDates ? [self.context.displayDateMin] : [],
  );
  if (self.context.disableDates.length > 1) self.context.disableDates.sort((a, b) => +new Date(a) - +new Date(b));

  // set self.context.enableDates
  setContext(self, 'enableDates', self.enableDates[0] ? parseDates(self.enableDates) : []);
  if (self.context.enableDates?.[0] && self.context.disableDates?.[0])
    setContext(
      self,
      'disableDates',
      self.context.disableDates.filter((d) => !self.context.enableDates.includes(d)),
    );
  if (self.context.enableDates.length > 1) self.context.enableDates.sort((a, b) => +new Date(a) - +new Date(b));

  if (self.context.enableDates?.[0] && self.disableAllDates) {
    setContext(self, 'displayDateMin', self.context.enableDates[0]);
    setContext(self, 'displayDateMax', self.context.enableDates[self.context.enableDates.length - 1]);
  }

  // set self.context.dateMin and self.context.dateMax
  setContext(self, 'dateMin', self.displayDisabledDates ? dateMin : self.context.displayDateMin);
  setContext(self, 'dateMax', self.displayDisabledDates ? dateMax : self.context.displayDateMax);
};

export default initRange;
