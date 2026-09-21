import createDates from '@scripts/creators/createDates/createDates';
import createYears from '@scripts/creators/createYears';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import getRootNode from '@scripts/utils/getRootNode';
import { getReusableRender, pauseRenderObservation, type RenderState } from '@scripts/utils/renderState';
import setContext from '@scripts/utils/setContext';
import { getExtensions } from '@src/extension';
import type { Calendar, Range } from '@src/index';

export type Route = 'prev' | 'next';

type Navigator = {
  selector: string;
  shift: (route: Route) => void;
  render: (target?: HTMLElement, reuse?: RenderState) => void;
};

const DATES = '[data-vc="dates"]';

const step = (route: Route, amount: number) => (route === 'next' ? amount : -amount);

const shiftMonth = (self: Calendar, route: Route) => {
  const jumpDate = getDate(getDateString(new Date(self.context.selectedYear, self.context.selectedMonth, 1)));
  jumpDate.setMonth(jumpDate.getMonth() + step(route, self.monthsToSwitch));
  setContext(self, 'selectedMonth', jumpDate.getMonth() as Range<12>);
  setContext(self, 'selectedYear', jumpDate.getFullYear());
};

export const getNavigator = (self: Calendar): Navigator | null => {
  const byMonth = {
    selector: DATES,
    shift: (route: Route) => shiftMonth(self, route),
    render: (_?: HTMLElement, reuse?: RenderState) => createDates(self, reuse),
  };

  return (
    {
      default: byMonth,
      multiple: byMonth,
      week: { selector: DATES, shift: (route: Route) => getExtensions(self).weeks?.shift(self, route), render: () => createDates(self) },
      year: {
        selector: '[data-vc="years"]',
        shift: (route: Route) => setContext(self, 'displayYear', self.context.displayYear + step(route, 15)),
        render: (target?: HTMLElement) => createYears(self, target),
      },
      month: null,
    } satisfies Record<Calendar['type'], Navigator | null>
  )[self.context.currentType];
};

// The year list re-renders the whole layout, arrows included, so whatever was focused can be gone
// by the time it settles. Hand the focus back rather than let it drop to the document.
const keepFocusInside = (self: Calendar, route: Route, hadFocus: boolean) => {
  const { mainElement } = self.context;
  if (!hadFocus || mainElement.contains(getRootNode(mainElement).activeElement)) return;

  const arrowEl = mainElement.querySelector<HTMLElement>(`[data-vc-arrow="${route}"]`);
  if (arrowEl && arrowEl.style.visibility !== 'hidden') return arrowEl.focus();

  Array.from(mainElement.querySelectorAll<HTMLElement>('[tabindex="0"]'))
    .find((el) => !el.closest('[data-vc-ghost]'))
    ?.focus();
};

const handleNavigate = (self: Calendar, route: Route, target?: HTMLElement) => {
  const navigator = getNavigator(self);
  if (!navigator) return;

  const { mainElement } = self.context;
  const hadFocus = mainElement.contains(getRootNode(mainElement).activeElement);

  let reuse = self.context.currentType === 'multiple' ? getReusableRender(self, true) : undefined;
  pauseRenderObservation(self);
  navigator.shift(route);
  const indices = reuse ? getExtensions(self).months?.rotate(self, reuse) : undefined;
  if (!indices) reuse = undefined;
  visibilityTitle(self, indices);
  visibilityArrows(self);
  const motion = getExtensions(self).motion;
  if (motion && self.animation) motion.navigate(self, navigator.selector, route, () => navigator.render(target, reuse));
  else navigator.render(target, reuse);
  keepFocusInside(self, route, hadFocus);
};

export default handleNavigate;
