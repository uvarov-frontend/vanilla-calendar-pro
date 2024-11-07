import handleArrowKeys from '@scripts/handles/handleArrowKeys';
import handleClick from '@scripts/handles/handleClick/handleClick';
import reset from '@scripts/methods/reset';
import setPosition from '@scripts/utils/positions/setPosition';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const createToInput = (self: Calendar, isVisible = true) => {
  const calendar = document.createElement('div');
  calendar.className = self.styles.calendar;
  calendar.dataset.vc = 'calendar';
  calendar.dataset.vcInput = '';
  calendar.dataset.vcCalendarHidden = '';
  calendar.style.visibility = 'hidden';

  setContext(self, 'inputModeInit', true);
  setContext(self, 'mainElement', calendar);
  document.body.appendChild(self.context.mainElement);

  if (isVisible) {
    queueMicrotask(() => {
      setPosition(self.context.inputElement, calendar, self.positionToInput);
      self.context.mainElement.style.visibility = 'visible';
      self.show();
    });
  }

  reset(self, {
    year: true,
    month: true,
    dates: true,
    time: true,
    locale: true,
  });

  if (self.onInit) self.onInit(self);
  handleArrowKeys(self);
  return handleClick(self);
};

export default createToInput;
