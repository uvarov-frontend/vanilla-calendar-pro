import type VanillaCalendar from '@src/vanilla-calendar';

const handleArrowKeys = (self: VanillaCalendar) => {
  const dateBtnEls = self.HTMLElement.querySelectorAll<HTMLButtonElement>('[data-vc-date-btn]');
  let currentFocusedIndex = 0;

  const directionMapping: Record<string, (index: number) => number> = {
    ArrowUp: (index) => Math.max(0, index - 7),
    ArrowDown: (index) => Math.min(dateBtnEls.length - 1, index + 7),
    ArrowLeft: (index) => Math.max(0, index - 1),
    ArrowRight: (index) => Math.min(dateBtnEls.length - 1, index + 1),
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!directionMapping[event.key]) return;
    currentFocusedIndex = directionMapping[event.key](currentFocusedIndex);
    dateBtnEls[currentFocusedIndex].focus();
  };

  self.HTMLElement.addEventListener('keydown', onKeyDown);

  return () => {
    self.HTMLElement.removeEventListener('keydown', onKeyDown);
  };
};

export default handleArrowKeys;
