import create from '@scripts/creators/create';
import createDates from '@scripts/creators/createDates/createDates';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import { scrub, type Transition } from '@scripts/handles/handleGestures/transition';
import { collapseEffect, getTiming } from '@scripts/utils/animate';
import initWeek from '@scripts/utils/initVariables/initWeek';
import setContext from '@scripts/utils/setContext';
import type { Calendar, TypesCalendar } from '@src/index';

const setType = (self: Calendar, type: TypesCalendar) => {
  self.type = type;
  setContext(self, 'currentType', type);
  create(self);
};

// Keep the collapse control mounted so its CSS rotation can run with the grid transition.
const stageDefault = (self: Calendar) => {
  self.type = 'default';
  setContext(self, 'currentType', 'default');
  createDates(self);
  visibilityArrows(self);

  const { mainElement } = self.context;
  const collapseEl = mainElement.querySelector<HTMLElement>('[data-vc="collapse"]');
  if (collapseEl) {
    collapseEl.ariaExpanded = 'true';
    collapseEl.ariaLabel = self.labels.collapse;
  }
  const arrowPrevEl = mainElement.querySelector<HTMLElement>('[data-vc-arrow="prev"]');
  const arrowNextEl = mainElement.querySelector<HTMLElement>('[data-vc-arrow="next"]');
  if (arrowPrevEl) arrowPrevEl.ariaLabel = self.labels.arrowPrev.month;
  if (arrowNextEl) arrowNextEl.ariaLabel = self.labels.arrowNext.month;
};

// Both directions animate the month DOM and swap to the resting layout only at an endpoint.
const buildCollapse = (self: Calendar): Transition => {
  const wasCollapsed = self.context.currentType === 'week';
  if (wasCollapsed) stageDefault(self);
  else initWeek(self, true);

  const datesEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="dates"]') as HTMLElement;
  const rows = Array.from(datesEl.querySelectorAll<HTMLElement>('[data-vc-dates="row"]'));
  const targetRow = rows.find((row) => row.querySelector(`[data-vc-date="${self.context.displayWeekDate}"]`)) ?? rows[0];
  const fromHeight = datesEl.offsetHeight;

  const offset = targetRow.offsetTop - rows[0].offsetTop;
  const timing = { ...getTiming(self, collapseEffect), fill: 'both' as const };
  const duration = timing.duration;
  const canAnimate = typeof datesEl.animate === 'function';

  if (canAnimate) datesEl.dataset.vcCollapsing = '';

  const animations = canAnimate
    ? [
        datesEl.animate([{ height: `${fromHeight}px` }, { height: `${targetRow.offsetHeight}px` }], timing),
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
    if (toWeek) return setType(self, 'week');
    if (wasCollapsed) return setType(self, 'default');
    datesEl.removeAttribute('data-vc-collapsing');
  });

  const from = wasCollapsed ? 1 : 0;
  seek(from);

  return { distance: fromHeight - targetRow.offsetHeight, from, track, seek, settle };
};

export default buildCollapse;
