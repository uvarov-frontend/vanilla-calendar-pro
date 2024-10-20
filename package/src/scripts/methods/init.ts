import create from '@scripts/create';
import handleClick from '@scripts/handles/handleClick';
import handleInput from '@scripts/handles/handleInput';
import setVariables from '@scripts/helpers/setVariables';
import type VanillaCalendar from '@src/vanilla-calendar';

const init = (self: VanillaCalendar) => {
  self.HTMLOriginalElement = self.HTMLElement.cloneNode(true) as HTMLElement;
  self.isInit = true;

  if (self.input) return handleInput(self);

  setVariables(self);
  create(self);
  if (self.actions.initCalendar) self.actions.initCalendar(self);
  return handleClick(self);
};

export default init;
