import createDates from '@scripts/creators/createDates/createDates';
import createDOM from '@scripts/creators/createDOM';
import createMonths from '@scripts/creators/createMonths';
import createTime from '@scripts/creators/createTime';
import createWeek from '@scripts/creators/createWeek';
import createYears from '@scripts/creators/createYears';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import handleTheme from '@scripts/handles/handleTheme';
import getLocale from '@scripts/helpers/getLocale';
import type VanillaCalendar from '@src/vanilla-calendar';

const create = (self: VanillaCalendar) => {
  const types = {
    default: () => {
      createWeek(self);
      createDates(self);
    },
    multiple: () => {
      createWeek(self);
      createDates(self);
    },
    month: () => createMonths(self),
    year: () => createYears(self),
  };

  handleTheme(self);
  getLocale(self);
  createDOM(self);
  visibilityTitle(self);
  visibilityArrows(self);
  createTime(self);

  types[self.currentType]();
};

export default create;
