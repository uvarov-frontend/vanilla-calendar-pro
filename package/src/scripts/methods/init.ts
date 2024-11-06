import create from '@scripts/creators/create';
import handleArrowKeys from '@scripts/handles/handleArrowKeys';
import handleClick from '@scripts/handles/handleClick/handleClick';
import handleInput from '@scripts/handles/handleInput';
import initAllVariables from '@scripts/utils/initVariables/initAllVariables';
import type { VanillaCalendarPro } from '@src/index';

const init = (self: VanillaCalendarPro) => {
  self.context.originalElement = self.context.mainElement.cloneNode(true) as HTMLElement;
  self.context.isInit = true;

  if (self.inputMode) return handleInput(self);

  initAllVariables(self);
  create(self);
  if (self.onInit) self.onInit(self);
  handleArrowKeys(self);
  return handleClick(self);
};

export default init;
