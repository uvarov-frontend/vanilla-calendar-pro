import createToInput from '@scripts/creators/createToInput';
import setPosition from '@scripts/utils/positions/setPosition';
import type { VanillaCalendarPro } from '@src/index';

const handleInput = (self: VanillaCalendarPro) => {
  const cleanup: Array<() => void> = [];
  self.context.inputElement = self.context.mainElement as HTMLInputElement;

  const handleResize = () => setPosition(self.context.inputElement, self.context.mainElement, self.positionToInput);

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    if (self?.context?.inputElement && self?.context?.mainElement) self.hide();
    document.removeEventListener('keydown', handleEscapeKey);
  };

  const documentClickEvent = (e: MouseEvent) => {
    if (!self || e.target === self.context.inputElement || self.context.mainElement.contains(e.target as HTMLElement)) return;
    if (self.context.inputElement && self.context.mainElement) self.hide();
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('click', documentClickEvent, { capture: true });
  };

  const handleOpenCalendar = () => {
    if (!self.context.inputModeInit) {
      cleanup.push(createToInput(self));
    } else {
      setPosition(self.context.inputElement, self.context.mainElement, self.positionToInput);
      self.context.mainElement.style.visibility = 'visible';
      self.show();
    }
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', documentClickEvent, { capture: true });
    document.addEventListener('keydown', handleEscapeKey);
  };

  self.context.inputElement.addEventListener('click', handleOpenCalendar);
  self.context.inputElement.addEventListener('focus', handleOpenCalendar);

  return () => {
    cleanup.forEach((clean) => clean());
  };
};

export default handleInput;
