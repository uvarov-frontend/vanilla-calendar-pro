import { getExtensions } from '@src/extension';
import { collapseEffect, getTiming } from '@src/extensions/motion/animate';
import { scrub, type Transition } from '@src/extensions/motion/gestures/transition';
import type { Calendar } from '@src/index';

// Both directions animate the month DOM and swap to the resting layout only at an endpoint.
const buildCollapse = (self: Calendar): Transition | null => {
  const state = getExtensions(self).weeks?.prepareCollapse(self);
  if (!state) return null;
  const { datesEl, rows, targetRow, wasCollapsed } = state;
  const fromHeight = datesEl.offsetHeight;
  const targetHeight = targetRow.offsetHeight;

  const offset = targetRow.offsetTop - rows[0].offsetTop;
  const timing = { ...getTiming(self, collapseEffect), fill: 'both' as const };
  const duration = timing.duration;
  const canAnimate = typeof datesEl.animate === 'function';

  if (canAnimate) datesEl.dataset.vcCollapsing = '';

  const animations = canAnimate
    ? [
        datesEl.animate([{ height: `${fromHeight}px` }, { height: `${targetHeight}px` }], timing),
        ...rows.map((row) =>
          row.animate(
            [
              { transform: 'none', opacity: 1 },
              { transform: `translateY(${-offset}px)`, opacity: row === targetRow ? 1 : 0 },
            ],
            timing,
          ),
        ),
      ]
    : [];

  const { track, seek, settle } = scrub(self, animations, duration, (toWeek) => {
    animations.forEach((animation) => animation.cancel());
    state.finish(toWeek);
  });

  const from = wasCollapsed ? 1 : 0;
  seek(from);

  return { distance: fromHeight - targetHeight, from, track, seek, settle };
};

export default buildCollapse;
