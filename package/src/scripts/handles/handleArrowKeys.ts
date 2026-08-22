import type { Calendar } from '@src/index';

const handleArrowKeys = (self: Calendar) => {
  const getOffset = (btn: HTMLButtonElement) => {
    if (btn.hasAttribute('data-vc-date-btn')) return 7;
    if (btn.hasAttribute('data-vc-months-month')) return 4;
    if (btn.hasAttribute('data-vc-years-year')) return 5;
    return 1;
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) || target.localName !== 'button') return;

    // the outgoing content lives on in the DOM until the animation ends: inert keeps it out of
    // the focus order but not out of the query, and indexing the buttons would not survive that
    const buttons = Array.from(self.context.mainElement.querySelectorAll<HTMLButtonElement>('[data-vc="calendar"] button')).filter(
      (button) => !button.closest('[data-vc-ghost]'),
    );
    const currentIndex = buttons.indexOf(target as HTMLButtonElement);
    if (currentIndex === -1) return;

    const offset = getOffset(buttons[currentIndex]);

    const direction = {
      ArrowUp: () => Math.max(0, currentIndex - offset),
      ArrowDown: () => Math.min(buttons.length - 1, currentIndex + offset),
      ArrowLeft: () => Math.max(0, currentIndex - 1),
      ArrowRight: () => Math.min(buttons.length - 1, currentIndex + 1),
    }[event.key]!;

    const nextIndex = direction();
    buttons[nextIndex]?.focus();
  };

  self.context.mainElement.addEventListener('keydown', onKeyDown);
  return () => self.context.mainElement.removeEventListener('keydown', onKeyDown);
};

export default handleArrowKeys;
