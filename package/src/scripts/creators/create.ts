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
import initWeek from '@scripts/utils/initVariables/initWeek';
import { pauseRenderObservation, rememberRender } from '@scripts/utils/renderState';
import type { Calendar } from '@src/index';

const create = (self: Calendar, capture = true) => {
  pauseRenderObservation(self);
  const createComponents = {
    default: () => {
      createWeek(self);
      createDates(self, undefined, false);
    },
    multiple: () => {
      createWeek(self);
      createDates(self, undefined, false);
    },
    week: () => {
      initWeek(self);
      createWeek(self);
      createDates(self, undefined, false);
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
  if (capture) rememberRender(self, true);
};

export default create;
