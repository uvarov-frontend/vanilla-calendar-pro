import create from '@scripts/creators/create';
import handleArrowKeys from '@scripts/handles/handleArrowKeys';
import handleClick from '@scripts/handles/handleClick/handleClick';
import handleInput from '@scripts/handles/handleInput';
import initAllVariables from '@scripts/utils/initVariables/initAllVariables';
import type VanillaCalendar from '@src/vanilla-calendar';

const init = (self: VanillaCalendar) => {
  self.private.originalElement = self.private.mainElement.cloneNode(true) as HTMLElement;
  self.private.isInit = true;

  if (self.input) return handleInput(self);

  initAllVariables(self);
  create(self);
  if (self.onInit) self.onInit(self);
  handleArrowKeys(self);
  return handleClick(self);
};

export default init;
