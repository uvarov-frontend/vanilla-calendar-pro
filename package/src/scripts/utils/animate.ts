import type { Calendar } from '@src/index';

type AnimationEffect = 'prev' | 'next' | 'fade';

type Effect = {
  enter?: string;
  leave?: string;
  fade?: boolean;
  duration: number;
  easing: string;
};

const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

const effects: Record<AnimationEffect, Effect> = {
  prev: { enter: 'translateX(-100%)', leave: 'translateX(100%)', duration: 250, easing: EASING },
  next: { enter: 'translateX(100%)', leave: 'translateX(-100%)', duration: 250, easing: EASING },
  fade: { fade: true, duration: 150, easing: EASING },
};

const isEnabled = (self: Calendar) =>
  !!self.animation && typeof Element.prototype.animate === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getTiming = (self: Calendar, effect: Effect) => {
  const options = typeof self.animation === 'object' ? self.animation : {};
  const scoped = (effect.fade ? options.fade : options.slide) ?? {};
  return {
    duration: scoped.duration ?? options.duration ?? effect.duration,
    easing: scoped.easing ?? options.easing ?? effect.easing,
  };
};

// The grid, the row gaps and the alignment live on the container rather than on its children,
// so a bare div would collapse the rows to the top without them.
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

const createGhost = (el: HTMLElement) => {
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
  // The root data-vc-type changes before the ghost is gone, so rules keyed on the type would
  // restyle the outgoing content. Pin the grids to keep the snapshot a snapshot.
  el.querySelectorAll<HTMLElement>(GRID_SELECTOR).forEach((grid) => {
    grid.style.height = `${grid.offsetHeight}px`;
    grid.style.flex = 'none';
  });
  ghost.append(...el.children);
  return ghost;
};

const stopAnimating = (el: HTMLElement) => {
  el.removeAttribute('data-vc-animating');
  el.parentElement?.removeAttribute('data-vc-clip');
};

// Without this a ghost from an interrupted transition outlives the next render and turns up in
// queries such as '[data-vc="dates"]'.
const cleanupPending = (mainElement: HTMLElement) => {
  mainElement.querySelectorAll<HTMLElement>('[data-vc-ghost]').forEach((ghost) => {
    ghost.getAnimations().forEach((animation) => animation.cancel());
    ghost.remove();
  });
  mainElement.querySelectorAll<HTMLElement>('[data-vc-animating]').forEach((el) => {
    el.getAnimations().forEach((animation) => animation.cancel());
    stopAnimating(el);
  });
};

// The dim of the neighbouring columns comes from CSS, but closing a picker rebuilds the whole
// grid, and browsers do not run a CSS transition on freshly inserted elements — so it is
// captured before the render and played out after it.
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

// only limits the transition to one match of the selector: in type: 'multiple' a type change
// touches a single column, and cross-fading the untouched ones over themselves would flicker.
const animate = (self: Calendar, selector: string, effectName: AnimationEffect, render: () => void, only?: number) => {
  if (!isEnabled(self)) return render();

  const { mainElement } = self.context;
  cleanupPending(mainElement);

  const effect = effects[effectName];
  const timing = getTiming(self, effect);
  // Without fill the ghost snaps back to its first frame and flashes the old content before
  // onfinish removes it.
  const ghostTiming: KeyframeAnimationOptions = { ...timing, fill: 'forwards' };

  const snapshots = Array.from(mainElement.querySelectorAll<HTMLElement>(selector)).map((el, index) => {
    if (only !== undefined && only !== index) return null;
    // Has to be positioned before measuring: the ghost's offsets are relative to it.
    el.parentElement?.setAttribute('data-vc-clip', '');
    return { ghost: createGhost(el) };
  });

  render();

  // createLayouts rewrites innerHTML, so the container may be a different element by now.
  mainElement.querySelectorAll<HTMLElement>(selector).forEach((el, index) => {
    const snapshot = snapshots[index];
    if (!snapshot) return;

    // The renderer skipped this container, so there is nothing to animate — put the content back.
    if (!el.children.length) {
      el.append(...snapshot.ghost.children);
      stopAnimating(el);
      return;
    }

    el.dataset.vcAnimating = '';
    el.parentElement?.setAttribute('data-vc-clip', '');
    el.parentElement?.appendChild(snapshot.ghost);

    const finish = () => {
      snapshot.ghost.remove();
      stopAnimating(el);
    };

    const [leave, enter]: [Keyframe[], Keyframe[]] = effect.fade
      ? [
          [{ opacity: 1 }, { opacity: 0 }],
          [{ opacity: 0 }, { opacity: 1 }],
        ]
      : [
          [{ transform: 'none' }, { transform: effect.leave as string }],
          [{ transform: effect.enter as string }, { transform: 'none' }],
        ];

    snapshot.ghost.animate(leave, ghostTiming);
    el.animate(enter, timing).onfinish = finish;
  });
};

export default animate;
