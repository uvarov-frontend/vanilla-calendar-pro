import handleArrowKeys from '@scripts/handles/handleArrowKeys';
import handleClick from '@scripts/handles/handleClick/handleClick';
import handleGestures from '@scripts/handles/handleGestures/handleGestures';
import { show } from '@scripts/methods';
import reset from '@scripts/methods/reset';
import getRootNode from '@scripts/utils/getRootNode';
import setContext from '@scripts/utils/setContext';
import { hideFromAT } from '@scripts/utils/toggleTabbing';
import type { Calendar } from '@src/index';

const createToInput = (self: Calendar) => {
  const calendar = document.createElement('div');
  calendar.className = self.styles.calendar;
  calendar.dataset.vc = 'calendar';
  calendar.dataset.vcInput = '';
  calendar.dataset.vcCalendarHidden = '';
  // An absolutely positioned element without coordinates uses its static position at the end of
  // the document. Even hidden by opacity, that can briefly extend the page and flash a scrollbar
  // before show() calculates the position next to the input.
  Object.assign(calendar.style, { left: '0', top: '0' });
  hideFromAT(calendar);

  // append into the input's own root (a ShadowRoot if the calendar lives inside one, so the
  // popup stays inside the same encapsulated style scope; document.body otherwise, since a
  // Document itself can't directly accept an arbitrary element as a child)
  const inputRoot = getRootNode(self.context.mainElement);
  const appendTarget = inputRoot === document ? document.body : inputRoot;

  setContext(self, 'inputModeInit', true);
  setContext(self, 'isShowInInputMode', false);
  setContext(self, 'mainElement', calendar);
  appendTarget.appendChild(self.context.mainElement);

  reset(self, {
    year: true,
    month: true,
    dates: true,
    time: true,
    locale: true,
  });

  setTimeout(() => show(self));

  if (self.onInit) self.onInit(self);
  handleArrowKeys(self);
  handleGestures(self);
  return handleClick(self);
};

export default createToInput;
