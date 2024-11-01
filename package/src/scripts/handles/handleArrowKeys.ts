import type { VanillaCalendar } from '@src/vanilla-calendar';

const handleArrowKeys = (self: VanillaCalendar) => {
  const updateButtons = () => Array.from(self.private.mainElement.querySelectorAll<HTMLButtonElement>('[data-vc="calendar"] button'));

  let currentFocusedIndex = 0;

  const directionMapping: Record<string, (index: number, offset: number) => number> = {
    ArrowUp: (index, offset) => Math.max(0, index - offset),
    ArrowDown: (index, offset) => Math.min(updateButtons().length - 1, index + offset),
    ArrowLeft: (index) => Math.max(0, index - 1),
    ArrowRight: (index) => Math.min(updateButtons().length - 1, index + 1),
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!directionMapping[event.key] || (event.target as HTMLElement)?.localName !== 'button') return;
    const buttons = updateButtons();
    const offset = buttons[currentFocusedIndex].hasAttribute('data-vc-date-btn')
      ? 7
      : buttons[currentFocusedIndex].hasAttribute('data-vc-months-month')
        ? 4
        : buttons[currentFocusedIndex].hasAttribute('data-vc-years-year')
          ? 5
          : 1;
    currentFocusedIndex = directionMapping[event.key](currentFocusedIndex, offset);
    buttons[currentFocusedIndex]?.focus();
  };

  self.private.mainElement.addEventListener('keydown', onKeyDown);

  return () => {
    self.private.mainElement.removeEventListener('keydown', onKeyDown);
  };
};

export default handleArrowKeys;
