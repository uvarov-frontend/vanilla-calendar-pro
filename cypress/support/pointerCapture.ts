// cy.trigger() dispatches untrusted pointers, which Firefox/WebKit do not register
// as active hardware pointers. Model capture only for those synthetic IDs. Native
// capture is covered separately by tests/browser/native.mjs without this shim.
export function syntheticPointerCapture(win: Window & typeof globalThis) {
  const active = new Set<number>();
  const captures = new Map<number, Element>();
  const prototype = win.Element.prototype;
  const originalSet = prototype.setPointerCapture;
  const originalRelease = prototype.releasePointerCapture;
  const originalHas = prototype.hasPointerCapture;

  win.addEventListener(
    'pointerdown',
    (event) => {
      if (!event.isTrusted) active.add(event.pointerId);
    },
    true,
  );
  for (const type of ['pointerup', 'pointercancel']) {
    win.addEventListener(type, (event) => {
      const pointer = event as PointerEvent;
      win.queueMicrotask(() => {
        active.delete(pointer.pointerId);
        captures.delete(pointer.pointerId);
      });
    });
  }
  prototype.setPointerCapture = function (id) {
    if (active.has(id)) captures.set(id, this);
    else originalSet.call(this, id);
  };
  prototype.releasePointerCapture = function (id) {
    if (active.has(id)) captures.delete(id);
    else originalRelease.call(this, id);
  };
  prototype.hasPointerCapture = function (id) {
    return active.has(id) ? captures.get(id) === this : originalHas.call(this, id);
  };
}
