import type { CalendarExtension, MotionExtension } from '@src/extension';
import animate, { captureOpacity, cleanupPending, playOpacity } from './animate';
import collapse from './gestures/collapseTransition';
import handleGestures, { cleanupGestures, resetGestures } from './gestures/handleGestures';

/** Animations and gestures for the registered calendar views. Configuration stays on Calendar. */
export const motion: CalendarExtension = /* @__PURE__ */ Object.freeze({
  name: 'motion',
  bind: handleGestures,
  reset(self) {
    resetGestures(self);
    cleanupPending(self.context.mainElement);
  },
  destroy(self) {
    cleanupGestures(self.context.mainElement);
    cleanupPending(self.context.mainElement);
  },
  collapse,
  navigate: animate,
  changeView(self, column, render) {
    const selector = '[data-vc="column"]';
    const dim = captureOpacity(self, selector);
    animate(self, '[data-vc="wrapper"]', 'fade', render, column);
    playOpacity(self, selector, dim);
  },
} satisfies MotionExtension) as unknown as CalendarExtension;
