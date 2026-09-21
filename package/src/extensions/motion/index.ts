import type { CalendarExtension, MotionExtension } from '@src/extension';
import animate, { captureOpacity, cleanupPending, playOpacity } from './animate';
import Collapse from './Collapse';
import click from './click';
import handleGestures, { cleanupGestures, resetGestures } from './gestures/handleGestures';

/** Animations, swipes and month/week collapse. Configuration stays on Calendar. */
export const motion: CalendarExtension = /* @__PURE__ */ Object.freeze({
  name: 'motion',
  component: Collapse,
  bind: handleGestures,
  reset(self) {
    resetGestures(self);
    cleanupPending(self.context.mainElement);
  },
  destroy(self) {
    cleanupGestures(self.context.mainElement);
    cleanupPending(self.context.mainElement);
  },
  click,
  navigate: animate,
  changeView(self, column, render) {
    const selector = '[data-vc="column"]';
    const dim = captureOpacity(self, selector);
    animate(self, '[data-vc="wrapper"]', 'fade', render, column);
    playOpacity(self, selector, dim);
  },
} satisfies MotionExtension) as unknown as CalendarExtension;
