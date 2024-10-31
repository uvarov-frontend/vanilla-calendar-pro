import handleArrowKeys from '@scripts/handles/handleArrowKeys';
import handleClick from '@scripts/handles/handleClick/handleClick';
import setPosition from '@scripts/utils/positions/setPosition';
import type VanillaCalendar from '@src/vanilla-calendar';

import reset from '@/package/src/scripts/methods/reset';

const createToInput = (self: VanillaCalendar, isVisible = true) => {
  const calendar = document.createElement('div');
  calendar.className = self.styles.calendar;
  calendar.dataset.vc = 'calendar';
  calendar.dataset.vcInput = '';
  calendar.dataset.vcCalendarHidden = '';
  calendar.style.visibility = 'hidden';

  self.private.isInputInit = true;
  self.private.mainElement = calendar;
  document.body.appendChild(self.private.mainElement);

  if (isVisible) {
    queueMicrotask(() => {
      setPosition(self.private.inputElement, calendar, self.settings.visibility.positionToInput);
      self.private.mainElement.style.visibility = 'visible';
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
