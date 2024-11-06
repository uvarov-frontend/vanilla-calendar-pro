import createDates from '@scripts/creators/createDates/createDates';
import createLayouts from '@scripts/creators/createLayouts';
import createMonths from '@scripts/creators/createMonths';
import createTime from '@scripts/creators/createTime';
import createWeek from '@scripts/creators/createWeek';
import createYears from '@scripts/creators/createYears';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import handleTheme from '@scripts/handles/handleTheme';
import getLocale from '@scripts/utils/getLocale';
import type { Calendar } from '@src/index';

const create = (self: Calendar) => {
  const createComponents = {
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
  createLayouts(self);
  visibilityTitle(self);
  visibilityArrows(self);
  createTime(self);
  createComponents[self.context.currentType]();
};

export default create;
