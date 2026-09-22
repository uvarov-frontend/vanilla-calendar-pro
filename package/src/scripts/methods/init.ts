import create from '@scripts/creators/create';
import updateDateModifiers from '@scripts/creators/createDates/updateDateModifiers';
import handleArrowKeys from '@scripts/handles/handleArrowKeys';
import handleClick from '@scripts/handles/handleClick/handleClick';
import handleInput from '@scripts/handles/handleInput';
import handleSelectDateRange from '@scripts/handles/handleSelectDateRange/handleSelectDateRange';
import errorMessages from '@scripts/utils/getErrorMessages';
import initAllVariables from '@scripts/utils/initVariables/initAllVariables';
import setContext from '@scripts/utils/setContext';
import { getExtensions, validateExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

const init = (self: Calendar) => {
  if (self.context.isInit) throw new Error(errorMessages.alreadyInit);

  validateExtensions(self);

  setContext(self, 'originalElement', self.context.mainElement.cloneNode(true) as HTMLElement);
  setContext(self, 'isInit', true);

  if (self.inputMode) {
    const cleanup = handleInput(self);
    setContext(self, 'cleanupInput', cleanup);
    return cleanup;
  }

  initAllVariables(self);
  create(self);
  if (self.selectionDatesMode === 'multiple-ranged' && self.context.selectedDates.length === 1) {
    handleSelectDateRange(self, null);
    updateDateModifiers(self);
  }
  if (self.onInit) self.onInit(self);
  if (self.context.isDestroyed) return;
  handleArrowKeys(self);
  getExtensions(self).motion?.bind(self);
  return handleClick(self);
};

export default init;
