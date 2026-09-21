// Browser fixtures for the extended audit. Only public Calendar APIs are used.
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const equal = (actual, expected, message) => assert(JSON.stringify(actual) === JSON.stringify(expected), `${message}: ${JSON.stringify({ actual, expected })}`);
const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));
const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));
const settle = async () => {
  await frame();
  await frame();
};
const defaults = { selectedYear: 2026, selectedMonth: 8, dateToday: '2026-09-21', selectedTheme: 'light' };
const errors = [];
window.addEventListener('error', (event) => errors.push(event.message));
window.addEventListener('unhandledrejection', (event) => errors.push(String(event.reason)));
const checkErrors = () => equal(errors, [], 'Uncaught browser errors');
function mount(module, options = {}) {
  const wrapper = document.createElement('section');
  wrapper.style.cssText = 'width:350px;position:relative;';
  const host = document.createElement(options.inputMode ? 'input' : 'div');
  wrapper.append(host);
  document.body.append(wrapper);
  const calendar = new module.Calendar(host, {
    ...(module.motion ? { extensions: [module.motion, module.timePicker, module.datePopups] } : {}),
    ...defaults,
    ...options,
  });
  calendar.init();
  return { calendar, wrapper, host };
}
function release(instance) {
  if (!instance.calendar.context.isDestroyed) instance.calendar.destroy();
  instance.wrapper.remove();
}
const root = (instance) => instance.calendar.context.mainElement;
const button = (instance, date) => {
  const result = root(instance).querySelector(`[data-vc-date="${date}"] button`);
  assert(result, `Missing date ${date}`);
  return result;
};
const navigate = (instance, route = 'next') => root(instance).querySelector(`[data-vc-arrow="${route}"]`).click();
const hover = (instance, date) => button(instance, date).dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
async function finishMotion() {
  const started = performance.now();
  do {
    await settle();
    if (performance.now() - started > 3000) throw new Error('Animations did not finish within 3 seconds.');
  } while (document.getAnimations().some((animation) => animation.playState === 'running' || animation.playState === 'pending'));
  assert(!document.querySelector('[data-vc-ghost], [data-vc-animating], [data-vc-dragging], [data-vc-clip]'), 'Stale transition DOM');
  checkErrors();
}

// Track global subscriptions and pending tasks separately from heap measurements.
// Local DOM listeners are checked by collecting their nodes, not by retaining them here.
function trackResources() {
  const active = [];
  const observers = new Set();
  const timers = new Set();
  const frames = new Set();
  const native = {
    add: EventTarget.prototype.addEventListener,
    remove: EventTarget.prototype.removeEventListener,
    Observer: window.MutationObserver,
    timeout: window.setTimeout,
    clear: window.clearTimeout,
    frame: window.requestAnimationFrame,
    cancel: window.cancelAnimationFrame,
  };
  const capture = (options) => (typeof options === 'boolean' ? options : Boolean(options?.capture));
  EventTarget.prototype.addEventListener = function (type, callback, options) {
    if (
      (this === window || this === document || this instanceof MediaQueryList) &&
      !active.some((record) => record.target === this && record.type === type && record.callback === callback && record.capture === capture(options))
    )
      active.push({ target: this, type, callback, capture: capture(options) });
    return native.add.call(this, type, callback, options);
  };
  EventTarget.prototype.removeEventListener = function (type, callback, options) {
    const index = active.findIndex(
      (record) => record.target === this && record.type === type && record.callback === callback && record.capture === capture(options),
    );
    if (index >= 0) active.splice(index, 1);
    return native.remove.call(this, type, callback, options);
  };
  window.MutationObserver = class extends native.Observer {
    observe(...args) {
      observers.add(this);
      return super.observe(...args);
    }
    disconnect() {
      observers.delete(this);
      return super.disconnect();
    }
  };
  window.setTimeout = (callback, delay, ...args) => {
    const id = native.timeout.call(
      window,
      () => {
        timers.delete(id);
        callback(...args);
      },
      delay,
    );
    timers.add(id);
    return id;
  };
  window.clearTimeout = (id) => {
    timers.delete(id);
    native.clear.call(window, id);
  };
  window.requestAnimationFrame = (callback) => {
    const id = native.frame.call(window, (time) => {
      frames.delete(id);
      callback(time);
    });
    frames.add(id);
    return id;
  };
  window.cancelAnimationFrame = (id) => {
    frames.delete(id);
    native.cancel.call(window, id);
  };
  return {
    snapshot: () => ({ globalListeners: active.map(({ type }) => type), observers: observers.size, timers: timers.size, frames: frames.size }),
    restore() {
      EventTarget.prototype.addEventListener = native.add;
      EventTarget.prototype.removeEventListener = native.remove;
      window.MutationObserver = native.Observer;
      window.setTimeout = native.timeout;
      window.clearTimeout = native.clear;
      window.requestAnimationFrame = native.frame;
      window.cancelAnimationFrame = native.cancel;
    },
  };
}

const cycleOptions = [
  {},
  { type: 'multiple', displayMonthsCount: 3 },
  { type: 'multiple', displayMonthsCount: 12 },
  { inputMode: true },
  { disableDates: ['2000-01-01:2025-12-31'], enableDates: ['2025-01-01:2025-12-31'], locale: 'ja' },
  { selectedTheme: 'system', selectedHolidays: ['2020-01-01:2030-12-31'], popups: { '2020-01-01:2030-12-31': { html: 'Event' } } },
  { inputMode: true, selectedTheme: 'system', animation: true, enableSwipe: true, selectionTimeMode: 24 },
  { selectionDatesMode: 'multiple-ranged', selectedDates: ['2026-09-10'], onCreateDateRangeTooltip: () => 'Range' },
  { type: 'multiple', displayMonthsCount: 3, animation: true, disableWeekdays: [0, 6] },
];
let weakReferences = [];
window.runCycles = async ({ count, tracked = false }) => {
  const module = await import('/current.mjs');
  const tracker = tracked ? trackResources() : null;
  try {
    for (let i = 0; i < count; i++) {
      const instance = mount(module, cycleOptions[i % cycleOptions.length]);
      if (instance.calendar.inputMode) {
        instance.host.click();
        await wait();
      }
      weakReferences.push(new WeakRef(instance.calendar), new WeakRef(root(instance)), new WeakRef(instance.host));
      instance.calendar.set({ selectedDates: ['2026-09-12'] });
      navigate(instance);
      root(instance)
        .querySelectorAll('[data-vc-ghost]')
        .forEach((ghost) => weakReferences.push(new WeakRef(ghost)));
      instance.calendar.set({ selectedDates: ['2026-09-10'] });
      if (instance.calendar.selectionDatesMode === 'multiple-ranged') {
        hover(instance, '2026-09-15');
        root(instance).dispatchEvent(new MouseEvent('mouseleave'));
      }
      if (instance.calendar.inputMode) {
        instance.calendar.hide();
        instance.calendar.show();
      }
      release(instance); // Includes destroy during motion and before pending hover/popups.
      if (tracked) equal(tracker.snapshot(), { globalListeners: [], observers: 0, timers: 0, frames: 0 }, `Resources after destroy, cycle ${i}`);
      if (i % 10 === 0) await wait();
    }
    await settle();
    checkErrors();
    assert(!document.querySelector('[data-vc="calendar"]'), 'Calendar remains mounted after cycles');
    return { count, resources: tracker?.snapshot() };
  } finally {
    tracker?.restore();
  }
};
window.checkCollected = () => {
  const alive = weakReferences.filter((reference) => reference.deref()).length;
  const checked = weakReferences.length;
  weakReferences = [];
  return { alive, checked };
};

window.checkMultiple = async () => {
  const module = await import('/current.mjs');
  const instances = [];
  const add = (options) => {
    const instance = mount(module, options);
    instances.push(instance);
    return instance;
  };
  const passed = [];
  try {
    document.documentElement.dataset.theme = 'light';
    const first = add({
      enableEdgeDatesOnly: false,
      selectionDatesMode: 'multiple-ranged',
      selectedDates: ['2026-09-10'],
      locale: 'en',
      selectedTheme: 'system',
      displayDateMin: '2026-09-01',
      displayDateMax: '2026-09-30',
      disableDatesGaps: true,
      disableDates: ['2026-09-18'],
      onCreateDateRangeTooltip: () => 'First',
    });
    const second = add({
      selectionDatesMode: 'multiple-ranged',
      selectedDates: ['2026-09-20'],
      locale: 'ru',
      selectedTheme: 'dark',
      displayDateMin: '2026-08-01',
      displayDateMax: '2026-10-31',
      disableDatesGaps: true,
      disableDates: ['2026-09-15'],
      onCreateDateRangeTooltip: () => 'Second',
    });
    const plain = add({ locale: 'de', selectedDates: ['2026-09-02'], selectionTimeMode: 24, selectedTime: '12:30' });
    const input = add({ locale: 'ja', inputMode: true });
    const plainBefore = root(plain).innerHTML;
    hover(first, '2026-09-14');
    hover(second, '2026-09-24'); // Both rAF callbacks must run for their own instance.
    await settle();
    equal(root(first).querySelector('[data-vc-date-hover="last"]')?.dataset.vcDate, '2026-09-14', 'First range hover isolation');
    equal(root(second).querySelector('[data-vc-date-hover="last"]')?.dataset.vcDate, '2026-09-24', 'Second range hover isolation');
    equal(root(first).querySelector('[data-vc-date-range-tooltip]')?.textContent, 'First', 'First tooltip');
    equal(root(second).querySelector('[data-vc-date-range-tooltip]')?.textContent, 'Second', 'Second tooltip');
    passed.push('concurrent range frames and tooltips');
    button(first, '2026-09-14').click();
    equal([first.calendar.context.displayDateMin, first.calendar.context.displayDateMax], ['2026-09-01', '2026-09-30'], 'First range restores its own bounds');
    equal(second.calendar.context.selectedDates, ['2026-09-20'], 'Second selection unchanged');
    passed.push('independent disabled-gap bounds and range selection');
    hover(second, '2026-09-23');
    root(second).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await settle();
    equal(second.calendar.context.selectedDates, [], 'Escape clears target range');
    assert(!root(second).querySelector('[data-vc-date-hover]'), 'Pending hover does not revive an escaped range');
    equal(root(second).querySelector('[data-vc-date-range-tooltip]')?.dataset.vcDateRangeTooltip, 'hidden', 'Escape keeps tooltip hidden after pending frame');
    equal(first.calendar.context.selectedDates.length, 5, 'Escape preserves other selection');
    passed.push('Escape belongs to its calendar');
    first.calendar.set({ selectedDates: ['2026-09-10'] });
    second.calendar.set({ selectedDates: ['2026-09-20'] });
    hover(first, '2026-09-14');
    root(first).dispatchEvent(new MouseEvent('mouseleave'));
    hover(second, '2026-09-24');
    release(first);
    await wait(70);
    equal(root(second).querySelector('[data-vc-date-hover="last"]')?.dataset.vcDate, '2026-09-24', 'Destroy cancels only its own tasks');
    passed.push('destroy one range while another has queued hover');
    hover(second, '2026-09-23');
    second.calendar.set({ selectionDatesMode: 'single', selectedDates: ['2026-09-20'] });
    await settle();
    hover(second, '2026-09-24');
    await settle();
    assert(!root(second).querySelector('[data-vc-date-hover]'), 'Switching selection mode cancels queued range work and handlers');
    second.calendar.set({ selectionDatesMode: 'multiple-ranged', selectedDates: ['2026-09-20'], displayDateMin: '2026-09-05', displayDateMax: '2026-10-10' });
    second.calendar.update({ dates: false, month: false, year: false });
    hover(second, '2026-09-24');
    await settle();
    equal(root(second).querySelector('[data-vc-date-hover="last"]')?.dataset.vcDate, '2026-09-24', 'Range still works after update preserving selection');
    button(second, '2026-09-24').click();
    equal(
      [second.calendar.context.displayDateMin, second.calendar.context.displayDateMax],
      ['2026-09-05', '2026-10-10'],
      'Updated bounds replace old range bounds',
    );
    passed.push('set mode/bounds and update preserving selection cancel stale work');
    input.host.click();
    await wait();
    assert(input.calendar.context.isShowInInputMode, 'Input opened');
    document.documentElement.dataset.theme = 'dark';
    await settle();
    equal(root(second).dataset.vcTheme, 'dark', 'Explicit dark theme preserved');
    equal(root(plain).innerHTML, plainBefore, 'Unrelated locale, selection, time and DOM unchanged');
    const last = add({ selectedTheme: 'system', locale: 'en' });
    equal(root(last).dataset.vcTheme, 'dark', 'New system calendar reads current theme');
    document.documentElement.dataset.theme = 'light';
    await settle();
    equal(root(last).dataset.vcTheme, 'light', 'System theme follows source');
    equal(root(second).dataset.vcTheme, 'dark', 'Explicit theme isolated from source change');
    input.calendar.hide();
    passed.push('mixed input/time/locales/theme isolation');
    checkErrors();
    return { passed };
  } finally {
    instances.forEach(release);
    delete document.documentElement.dataset.theme;
  }
};

let rapid;
let pointerEvents = [];
window.prepareRapid = async () => {
  const module = await import('/current.mjs');
  rapid = mount(module, { animation: { duration: 100 }, enableSwipe: true, enableCollapse: true, selectionDatesMode: 'multiple-ranged' });
  pointerEvents = [];
  for (const type of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'gotpointercapture', 'lostpointercapture'])
    root(rapid).addEventListener(type, (event) =>
      pointerEvents.push({
        type,
        target: event.target.getAttribute('data-vc'),
        primary: event.isPrimary,
        pointerId: event.pointerId,
        trusted: event.isTrusted,
        x: event.clientX,
        y: event.clientY,
      }),
    );
  await settle();
  return true;
};
window.rapid = async (action) => {
  const instance = rapid;
  if (action === 'paced') {
    const longTasks = [];
    const observer = new PerformanceObserver((list) => longTasks.push(...list.getEntries().map((entry) => entry.duration)));
    observer.observe({ type: 'longtask' });
    const frames = [];
    let previous = performance.now();
    for (let i = 0; i < 30; i++) {
      navigate(instance, i % 2 ? 'prev' : 'next');
      await frame();
      const now = performance.now();
      frames.push(now - previous);
      previous = now;
    }
    await finishMotion();
    await wait();
    longTasks.push(...observer.takeRecords().map((entry) => entry.duration));
    observer.disconnect();
    equal(instance.calendar.context.selectedMonth, 8, 'Paced navigation final month');
    return { actions: 30, frameIntervalsMs: frames, longTaskDurationsMs: longTasks, maxFrameIntervalMs: Math.max(...frames) };
  }
  if (action === 'burst') {
    for (let i = 0; i < 20; i++) {
      instance.calendar.set({ selectedDates: ['2026-09-12'] });
      navigate(instance);
      navigate(instance, 'prev');
    }
    equal(instance.calendar.context.selectedMonth, 8, '40 alternating navigation clicks');
    await finishMotion();
    return { clicks: 40 };
  }
  if (action === 'start') {
    instance.calendar.animation = { duration: 1000 };
    navigate(instance);
    assert(document.getAnimations().length > 0, 'Navigation animation is active');
    const box = root(instance).querySelector('[data-vc="content"]').getBoundingClientRect();
    return { x: box.x + box.width * 0.7, y: box.y + box.height * 0.5, distance: box.width * 0.55 };
  }
  if (action === 'start-collapse') {
    const box = root(instance).querySelector('[data-vc="collapse"]').getBoundingClientRect();
    return { x: box.x + box.width * 0.5, y: box.y + box.height * 0.5, distance: 100 };
  }
  if (action === 'dragging') {
    assert(root(instance).hasAttribute('data-vc-dragging'), `Native pointer created active swipe: ${JSON.stringify(pointerEvents)}`);
    assert(root(instance).querySelector('[data-vc-ghost], [data-vc-collapsing]'), 'Gesture has an active transition');
    return {
      trustedPointerDown: pointerEvents.some((event) => event.type === 'pointerdown' && event.trusted),
      pointerCapture: pointerEvents.some((event) => event.type === 'gotpointercapture'),
    };
  }
  if (action === 'set') {
    instance.calendar.set({ selectedYear: 2027, selectedMonth: 2, selectedDates: ['2027-03-12'] });
    await finishMotion();
    return true;
  }
  if (action === 'verify-set') {
    await finishMotion();
    equal(
      [instance.calendar.context.selectedYear, instance.calendar.context.selectedMonth, instance.calendar.context.selectedDates],
      [2027, 2, ['2027-03-12']],
      'Late pointerup must not overwrite set()',
    );
    assert(button(instance, '2027-03-12').closest('[data-vc-date-selected]'), 'set() selection visible');
    return true;
  }
  if (action === 'update-animation') {
    navigate(instance);
    assert(document.getAnimations().length > 0, 'Animation started before update');
    instance.calendar.update({ month: false, year: false, dates: false });
    const expected = [instance.calendar.context.selectedYear, instance.calendar.context.selectedMonth];
    await wait(1100);
    await finishMotion();
    equal([instance.calendar.context.selectedYear, instance.calendar.context.selectedMonth], expected, 'Late animation finish preserves update result');
    return true;
  }
  if (action === 'destroy') {
    release(instance);
    rapid = null;
    await finishMotion();
    return true;
  }
  if (action === 'verify-destroy') {
    await finishMotion();
    assert(!document.querySelector('[data-vc="calendar"]'), 'Late pointer events must not recreate calendar');
    return true;
  }
  if (action === 'input-burst') {
    const module = await import('/current.mjs');
    const counts = { show: 0, hide: 0 };
    const input = mount(module, { inputMode: true, openOnFocus: true, onShow: () => counts.show++, onHide: () => counts.hide++ });
    try {
      for (let i = 0; i < 30; i++) {
        input.host.click();
        input.calendar.hide();
      }
      await settle();
      assert(!input.calendar.context.isShowInInputMode, 'hide cancels all queued opens');
      for (let i = 0; i < 30; i++) {
        input.host.click();
        await wait();
        assert(input.calendar.context.isShowInInputMode, 'Input opens');
        input.calendar.hide();
      }
      equal(counts.show, counts.hide, 'Balanced show/hide callbacks');
      input.host.click();
      release(input);
      await settle();
      checkErrors();
      return counts;
    } finally {
      release(input);
    }
  }
  throw new Error(`Unknown rapid action ${action}`);
};

// Called on a fresh browser context with HTTP cache disabled. No library/CSS
// resource has been requested before this function begins.
window.runStartup = async ({ variant, scenario }) => {
  const start = performance.now();
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/style.css';
  const cssReady = new Promise((resolve, reject) => {
    link.onload = () => resolve(performance.now() - start);
    link.onerror = () => reject(new Error('Stylesheet failed to load'));
  });
  document.head.append(link);
  const moduleStart = performance.now();
  const module = await import(`/${variant}.mjs`);
  const moduleMs = performance.now() - moduleStart;
  const cssMs = await cssReady;
  const options =
    scenario === 'input'
      ? { inputMode: true }
      : scenario === 'rich'
        ? {
            type: 'multiple',
            displayMonthsCount: 3,
            selectionTimeMode: 24,
            selectedHolidays: ['2020-01-01:2030-12-31'],
            popups: { '2000-01-01:2030-12-31': { html: 'Event' } },
          }
        : {};
  const host = document.createElement(options.inputMode ? 'input' : 'div');
  host.style.width = '1000px';
  document.body.append(host);
  const constructorStart = performance.now();
  const calendar = new module.Calendar(host, {
    ...(module.motion
      ? { extensions: [options.selectionTimeMode ? module.timePicker : undefined, options.popups ? module.datePopups : undefined].filter(Boolean) }
      : {}),
    ...defaults,
    ...options,
  });
  const constructorMs = performance.now() - constructorStart;
  const initStart = performance.now();
  calendar.init();
  if (options.inputMode) host.click();
  const initCallMs = performance.now() - initStart;
  await wait(); // Opening from input is scheduled with setTimeout.
  await settle(); // Includes popup rAF placement and a following rendering opportunity.
  const box = calendar.context.mainElement.getBoundingClientRect();
  assert(box.width > 0 && box.height > 0 && calendar.context.mainElement.querySelector('[data-vc-date]'), 'First rendering is ready');
  if (options.inputMode) assert(calendar.context.isShowInInputMode, 'First input opening completed');
  const result = {
    totalMs: performance.now() - start,
    createToReadyMs: performance.now() - constructorStart,
    moduleMs,
    cssMs,
    constructorMs,
    initCallMs,
    deferredMs: performance.now() - initStart - initCallMs,
    resources: performance
      .getEntriesByType('resource')
      .filter((entry) => entry.name.endsWith(`/${variant}.mjs`) || entry.name.endsWith('/style.css'))
      .map((entry) => ({
        name: new URL(entry.name).pathname,
        durationMs: entry.duration,
        transferSize: entry.transferSize,
        encodedBodySize: entry.encodedBodySize,
      })),
  };
  checkErrors();
  calendar.destroy();
  host.remove();
  return result;
};
window.auditReady = true;
