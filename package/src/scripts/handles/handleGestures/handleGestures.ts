import buildCollapse from '@scripts/handles/handleGestures/collapseTransition';
import createDragTracker, { type DragTracker } from '@scripts/handles/handleGestures/dragTracker';
import buildSwipe from '@scripts/handles/handleGestures/swipeTransition';
import { clamp, type Transition } from '@scripts/handles/handleGestures/transition';
import type { Calendar } from '@src/index';

const SLOP = { mouse: 4, pen: 6, touch: 10 } as const;
const slopFor = (event: PointerEvent) => SLOP[event.pointerType as keyof typeof SLOP] ?? SLOP.touch;
const COMMIT = 0.25;
const PROJECTION = 200; // ms
const CLICK_GRACE = 500;

const SWIPE_SURFACE = '[data-vc="content"]';
const COLLAPSE_SURFACE = '[data-vc="collapse"]';

type Drag = {
  pointerId: number;
  tracker: DragTracker;
  slop: number;
  vertical: boolean;
  transition: Transition | null;
  sign: number;
  distance: number;
};

const handleGestures = (self: Calendar) => {
  const { mainElement } = self.context;
  let drag: Drag | null = null;
  let draggedAt = 0;
  let activeListenersBound = false;

  const stopDragging = () => {
    drag = null;
    mainElement.removeAttribute('data-vc-dragging');
    removeActiveListeners();
  };

  const capture = (pointerId: number) => {
    try {
      mainElement.setPointerCapture(pointerId);
      return true;
    } catch {
      return false;
    }
  };

  const release = (pointerId: number) => {
    try {
      mainElement.releasePointerCapture(pointerId);
    } catch {
      // Pointer capture may already have been released by the browser.
    }
  };

  const deltaOf = (event: PointerEvent, current: Drag) =>
    current.vertical ? event.clientY - current.tracker.origin.y : event.clientX - current.tracker.origin.x;

  const progressOf = (event: PointerEvent, current: Drag) =>
    clamp((current.transition as Transition).from + (current.sign * deltaOf(event, current)) / current.distance);

  const onPointerDown = (event: PointerEvent) => {
    draggedAt = 0;
    if (drag || !event.isPrimary || event.button !== 0) return;

    const target = event.target as HTMLElement;
    const vertical = !!(self.enableCollapse && target.closest(COLLAPSE_SURFACE));
    const horizontal = !!(self.enableSwipe && target.closest(SWIPE_SURFACE) && !target.closest('[data-vc-ghost]'));
    if (!vertical && !horizontal) return;

    drag = { pointerId: event.pointerId, tracker: createDragTracker(event), slop: slopFor(event), vertical, transition: null, sign: -1, distance: 1 };
    addActiveListeners();
  };

  const startTransition = (event: PointerEvent, current: Drag, dx: number) => {
    if (!capture(event.pointerId)) return stopDragging();

    try {
      const transition = current.vertical ? buildCollapse(self) : buildSwipe(self, dx < 0 ? 'next' : 'prev', event.target as HTMLElement);
      if (!transition || !transition.distance) {
        release(event.pointerId);
        return stopDragging();
      }

      transition.track();
      current.transition = transition;
      current.sign = current.vertical || dx < 0 ? -1 : 1;
      current.distance = transition.distance;
      mainElement.dataset.vcDragging = '';
    } catch (error) {
      release(event.pointerId);
      stopDragging();
      throw error;
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    const current = drag;
    if (!current || event.pointerId !== current.pointerId) return;

    current.tracker.move(event);
    const dx = event.clientX - current.tracker.origin.x;
    const dy = event.clientY - current.tracker.origin.y;

    if (!current.transition) {
      if (Math.abs(dx) < current.slop && Math.abs(dy) < current.slop) return;
      // Do not claim the page's vertical scroll from the horizontal swipe surface.
      if (current.vertical !== Math.abs(dy) > Math.abs(dx)) return stopDragging();
      startTransition(event, current, dx);
      if (!drag) return;
    }

    draggedAt = Date.now();
    (current.transition as Transition).seek(progressOf(event, current));
  };

  const endDrag = (event: PointerEvent, lost: boolean) => {
    const current = drag;
    if (!current || event.pointerId !== current.pointerId) return;

    const { transition } = current;
    if (transition) {
      const velocity = lost ? 0 : current.tracker.velocity(event, current.vertical);
      const projected = progressOf(event, current) + (current.sign * velocity * PROJECTION) / current.distance;
      const toEnd = transition.from === 0 ? projected > COMMIT : projected >= 1 - COMMIT;

      transition.settle(lost ? transition.from === 1 : toEnd);
      release(current.pointerId);
      draggedAt = Date.now();
    }
    stopDragging();
  };

  const onPointerUp = (event: PointerEvent) => endDrag(event, false);
  const onPointerCancel = (event: PointerEvent) => endDrag(event, true);
  const onLostCapture = (event: PointerEvent) => {
    // Transferring implicit touch capture from the control emits a bubbling event from that control.
    if (event.target !== mainElement) return;
    endDrag(event, true);
  };

  const onClick = (event: MouseEvent) => {
    if (!draggedAt || Date.now() - draggedAt > CLICK_GRACE) return;
    draggedAt = 0;
    event.stopPropagation();
    event.preventDefault();
  };

  const activeListeners = [
    ['pointermove', onPointerMove],
    ['pointerup', onPointerUp],
    ['pointercancel', onPointerCancel],
    ['lostpointercapture', onLostCapture],
  ] as const;

  function addActiveListeners() {
    if (activeListenersBound) return;
    activeListenersBound = true;
    activeListeners.forEach(([type, listener]) => mainElement.addEventListener(type, listener as EventListener));
  }

  function removeActiveListeners() {
    if (!activeListenersBound) return;
    activeListenersBound = false;
    activeListeners.forEach(([type, listener]) => mainElement.removeEventListener(type, listener as EventListener));
  }

  mainElement.addEventListener('pointerdown', onPointerDown);
  mainElement.addEventListener('click', onClick, { capture: true });

  return () => {
    removeActiveListeners();
    mainElement.removeEventListener('pointerdown', onPointerDown);
    mainElement.removeEventListener('click', onClick, { capture: true });
  };
};

export default handleGestures;
