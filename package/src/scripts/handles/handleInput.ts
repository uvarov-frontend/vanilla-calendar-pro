import createToInput from '@scripts/creators/createToInput';
import setPosition from '@scripts/utils/positions/setPosition';
import type { VanillaCalendar } from '@src/vanilla-calendar';

const handleInput = (self: VanillaCalendar) => {
  const cleanup: Array<() => void> = [];
  self.private.inputElement = self.private.mainElement as HTMLInputElement;

  const handleResize = () => setPosition(self.private.inputElement, self.private.mainElement, self.positionToInput);

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    if (self?.private?.inputElement && self?.private?.mainElement) self.hide();
    document.removeEventListener('keydown', handleEscapeKey);
  };

  const documentClickEvent = (e: MouseEvent) => {
    if (!self || e.target === self.private.inputElement || self.private.mainElement.contains(e.target as HTMLElement)) return;
    if (self.private.inputElement && self.private.mainElement) self.hide();
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('click', documentClickEvent, { capture: true });
  };

  const handleOpenCalendar = () => {
    if (!self.private.isInputInit) {
      cleanup.push(createToInput(self));
    } else {
      setPosition(self.private.inputElement, self.private.mainElement, self.positionToInput);
      self.private.mainElement.style.visibility = 'visible';
      self.show();
    }
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', documentClickEvent, { capture: true });
    document.addEventListener('keydown', handleEscapeKey);
  };

  self.private.inputElement.addEventListener('click', handleOpenCalendar);
  self.private.inputElement.addEventListener('focus', handleOpenCalendar);

  return () => {
    cleanup.forEach((clean) => clean());
  };
};

export default handleInput;
