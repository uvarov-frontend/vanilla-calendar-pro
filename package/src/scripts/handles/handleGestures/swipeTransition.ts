import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import { scrub, type Transition } from '@scripts/handles/handleGestures/transition';
import { getNavigator, type Route } from '@scripts/handles/handleNavigate';
import { cleanupPending, createGhost, dropLayers, getTiming, type Layer, slideEffect } from '@scripts/utils/animate';
import type { Calendar } from '@src/index';

// Keep calendar state unchanged until the staged neighbouring period is committed.
const buildSwipe = (self: Calendar, route: Route, target: HTMLElement): Transition | null => {
  const navigator = getNavigator(self);
  if (!navigator) return null;

  const arrowEl = self.context.mainElement.querySelector<HTMLElement>(`[data-vc-arrow="${route}"]`);
  if (!arrowEl || arrowEl.style.visibility === 'hidden') return null;

  const { mainElement } = self.context;
  const containers = () => Array.from(mainElement.querySelectorAll<HTMLElement>(navigator.selector));
  const opposite: Route = route === 'next' ? 'prev' : 'next';
  const current = containers();

  if (!current.length) return null;

  if (typeof current[0].animate !== 'function') {
    const { track, seek, settle } = scrub(self, [], 0, (toEnd) => {
      if (!toEnd) return;
      navigator.shift(route);
      navigator.render(target);
      visibilityTitle(self);
      visibilityArrows(self);
    });
    return { distance: current[0].offsetWidth, from: 0, track, seek, settle };
  }

  cleanupPending(mainElement);

  navigator.shift(route);
  navigator.render(target);
  const staged = containers().map((el) => {
    el.parentElement?.setAttribute('data-vc-clip', '');
    return createGhost(el);
  });
  navigator.shift(opposite);
  navigator.render(target);

  const away = route === 'next' ? 100 : -100;
  const timing = { ...getTiming(self, slideEffect), fill: 'both' as const };

  const layers: Layer[] = containers().map((el, index) => {
    const ghost = staged[index];
    el.dataset.vcAnimating = '';
    el.parentElement?.setAttribute('data-vc-clip', '');
    el.parentElement?.appendChild(ghost);

    return {
      el,
      ghost,
      animations: [
        el.animate([{ transform: 'none' }, { transform: `translateX(${-away}%)` }], timing),
        ghost.animate([{ transform: `translateX(${away}%)` }, { transform: 'none' }], timing),
      ],
    };
  });

  if (!layers.length) return null;

  const animations = layers.flatMap((layer) => layer.animations);

  const drop = () => {
    animations.forEach((animation) => animation.cancel());
    dropLayers(layers);
  };

  // A queued finish must not touch layers already replaced by another transition.
  const isLive = () => layers[0].ghost.isConnected;

  const commit = () => {
    if (!isLive()) return;
    navigator.shift(route);
    navigator.render(target);
    drop();
    visibilityTitle(self);
    visibilityArrows(self);
  };

  const abort = () => drop();

  const { track, seek, settle } = scrub(self, animations, timing.duration, (toEnd) => (toEnd ? commit() : abort()));
  seek(0);

  return { distance: layers[0].el.offsetWidth, from: 0, track, seek, settle };
};

export default buildSwipe;
