import type { Calendar } from '@src/index';

type AnimationEffect = 'prev' | 'next' | 'fade';

type Effect = {
  enter?: string;
  leave?: string;
  group: 'slide' | 'fade' | 'collapse';
  duration: number;
  easing: string;
};

const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const slideEffect: Effect = { group: 'slide', duration: 250, easing: EASING };

const effects: Record<AnimationEffect, Effect> = {
  prev: { ...slideEffect, enter: 'translateX(-100%)', leave: 'translateX(100%)' },
  next: { ...slideEffect, enter: 'translateX(100%)', leave: 'translateX(-100%)' },
  fade: { group: 'fade', duration: 150, easing: EASING },
};

export const collapseEffect: Effect = { group: 'collapse', duration: 300, easing: EASING };

export const isEnabled = (self: Calendar) =>
  !!self.animation && typeof Element.prototype.animate === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getTiming = (self: Calendar, effect: Effect) => {
  const options = typeof self.animation === 'object' ? self.animation : {};
  const scoped = options[effect.group] ?? {};
  return {
    duration: scoped.duration ?? options.duration ?? effect.duration,
    easing: scoped.easing ?? options.easing ?? effect.easing,
  };
};

const LAYOUT_PROPS = [
  'display',
  'flexDirection',
  'gridTemplateColumns',
  'gridTemplateRows',
  'rowGap',
  'columnGap',
  'alignItems',
  'alignContent',
  'justifyItems',
  'justifyContent',
  'padding',
] as const;

const GRID_SELECTOR = '[data-vc="dates"], [data-vc="months"], [data-vc="years"]';

export const createGhost = (el: HTMLElement) => {
  const ghost = document.createElement('div');
  const computed = getComputedStyle(el);
  ghost.dataset.vcGhost = '';
  ghost.ariaHidden = 'true';
  ghost.setAttribute('inert', '');
  LAYOUT_PROPS.forEach((prop) => {
    ghost.style[prop] = computed[prop];
  });
  ghost.style.top = `${el.offsetTop}px`;
  ghost.style.left = `${el.offsetLeft}px`;
  ghost.style.width = `${el.offsetWidth}px`;
  ghost.style.height = `${el.offsetHeight}px`;
  // Root type changes can otherwise restyle the outgoing grid before it disappears.
  el.querySelectorAll<HTMLElement>(GRID_SELECTOR).forEach((grid) => {
    grid.style.height = `${grid.offsetHeight}px`;
    grid.style.flex = 'none';
  });
  ghost.append(...el.children);
  return ghost;
};

const stopAnimating = (el: HTMLElement) => {
  el.removeAttribute('data-vc-animating');
  el.removeAttribute('data-vc-collapsing');
  el.parentElement?.removeAttribute('data-vc-clip');
};

export const cleanupPending = (mainElement: HTMLElement) => {
  mainElement.querySelectorAll<HTMLElement>('[data-vc-ghost]').forEach((ghost) => {
    ghost.getAnimations().forEach((animation) => animation.cancel());
    ghost.remove();
  });
  mainElement.querySelectorAll<HTMLElement>('[data-vc-animating], [data-vc-collapsing]').forEach((el) => {
    el.getAnimations().forEach((animation) => animation.cancel());
    stopAnimating(el);
  });
};

// Freshly inserted grids cannot continue the CSS opacity transition from the old grid.
export const captureOpacity = (self: Calendar, selector: string) =>
  isEnabled(self) ? Array.from(self.context.mainElement.querySelectorAll<HTMLElement>(selector)).map((el) => getComputedStyle(el).opacity) : [];

export const playOpacity = (self: Calendar, selector: string, captured: string[]) => {
  if (!captured.length) return;
  const timing = getTiming(self, effects.fade);
  self.context.mainElement.querySelectorAll<HTMLElement>(selector).forEach((el, index) => {
    const from = captured[index];
    const to = getComputedStyle(el).opacity;
    if (from === undefined || from === to) return;
    el.animate([{ opacity: from }, { opacity: to }], timing);
  });
};

export type Layer = {
  el: HTMLElement;
  ghost: HTMLElement;
  animations: Animation[];
};

export const buildTransition = (self: Calendar, selector: string, effectName: AnimationEffect, render: () => void, onlyIndex?: number) => {
  const { mainElement } = self.context;
  cleanupPending(mainElement);

  const effect = effects[effectName];
  const timing = getTiming(self, effect);
  // Keep the ghost at its endpoint until the queued finish handler removes it.
  const ghostTiming: KeyframeAnimationOptions = { ...timing, fill: 'forwards' };

  const snapshots = Array.from(mainElement.querySelectorAll<HTMLElement>(selector)).map((el, index) => {
    if (onlyIndex !== undefined && onlyIndex !== index) return null;
    el.parentElement?.setAttribute('data-vc-clip', '');
    return { ghost: createGhost(el) };
  });

  render();

  const layers: Layer[] = [];

  mainElement.querySelectorAll<HTMLElement>(selector).forEach((el, index) => {
    const snapshot = snapshots[index];
    if (!snapshot) return;

    if (!el.children.length) {
      el.append(...snapshot.ghost.children);
      stopAnimating(el);
      return;
    }

    el.dataset.vcAnimating = '';
    el.parentElement?.setAttribute('data-vc-clip', '');
    el.parentElement?.appendChild(snapshot.ghost);

    const [leave, enter]: [Keyframe[], Keyframe[]] = effect.enter
      ? [
          [{ transform: 'none' }, { transform: effect.leave as string }],
          [{ transform: effect.enter }, { transform: 'none' }],
        ]
      : [
          [{ opacity: 1 }, { opacity: 0 }],
          [{ opacity: 0 }, { opacity: 1 }],
        ];

    layers.push({ el, ghost: snapshot.ghost, animations: [snapshot.ghost.animate(leave, ghostTiming), el.animate(enter, timing)] });
  });

  return { layers, duration: timing.duration };
};

// A queued finish must not remove clipping installed by a newer transition.
export const dropLayers = (layers: Layer[]) =>
  layers
    .filter(({ ghost }) => ghost.isConnected)
    .forEach(({ el, ghost }) => {
      ghost.remove();
      stopAnimating(el);
    });

const animate = (self: Calendar, selector: string, effectName: AnimationEffect, render: () => void, onlyIndex?: number) => {
  if (!isEnabled(self)) return render();

  const { layers } = buildTransition(self, selector, effectName, render, onlyIndex);
  layers.forEach((layer) => {
    layer.animations[1].onfinish = () => dropLayers([layer]);
  });
};

export default animate;
