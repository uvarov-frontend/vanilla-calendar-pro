const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));
const settle = async () => {
  await frame();
  await frame();
};
const defaults = { selectedYear: 2026, selectedMonth: 8, dateToday: '2026-09-21', selectedTime: '12:30', selectedTheme: 'light' };
const day = (cal, date) => cal.context.mainElement.querySelector(`[data-vc-date="${date}"] button`);
const arrow = (cal) => cal.context.mainElement.querySelector('[data-vc-arrow="next"]').click();
const selected = (cal) => cal.set({ selectedDates: ['2026-09-12'] });
const multiple = { type: 'multiple', displayMonthsCount: 12, selectedMonth: 0 };
const heavy = { disableDates: ['2000-01-01:2025-12-31'], enableDates: ['2025-12-01:2025-12-31'] };
const unsorted = Array.from({ length: 5000 }, (_, i) => new Date(Date.UTC(2010, 0, ((i * 197) % 5000) + 1)).toISOString().slice(0, 10));
const popup = { popups: { '2000-01-01:2030-12-31': { html: '<b>Event</b>' } } };
const callbackRules = {
  ...multiple,
  selectedDates: ['2020-01-01:2030-12-31'],
  disableDates: ['2010-01-01:2019-12-31'],
  selectedHolidays: ['2020-01-01:2030-12-31'],
  onCreateDateEls: () => {},
};
export const scenarios = [
  { name: 'init-month', options: {} },
  { name: 'init-month-callback', options: { onCreateDateEls: () => {} } },
  { name: 'init-12-months-disabled-weekdays', options: { ...multiple, disableWeekdays: [0, 6] } },
  { name: 'init-week', options: { type: 'week' } },
  { name: 'init-12-months', options: multiple },
  { name: 'init-12-months-week-numbers', options: { ...multiple, enableWeekNumbers: true } },
  { name: 'init-12-months-holidays', options: { ...multiple, selectedHolidays: ['2020-01-01:2030-12-31'] } },
  { name: 'navigate-month', options: {}, action: arrow },
  { name: 'navigate-12-months', options: multiple, action: arrow },
  { name: 'navigate-2-months', options: { type: 'multiple', displayMonthsCount: 2 }, action: arrow },
  { name: 'navigate-3-months', options: { type: 'multiple', displayMonthsCount: 3 }, action: arrow },
  { name: 'navigate-12-months-prev', options: multiple, action: (cal) => cal.context.mainElement.querySelector('[data-vc-arrow="prev"]').click() },
  { name: 'navigate-12-months-step3', options: { ...multiple, monthsToSwitch: 3 }, action: arrow },
  { name: 'set-selected-date-3-months', options: { type: 'multiple', displayMonthsCount: 3 }, action: selected },
  { name: 'set-selected-date-12-months', options: multiple, action: selected },
  { name: 'set-selected-date', options: {}, action: selected },
  { name: 'select-date-12-months', options: multiple, action: (cal) => day(cal, '2026-09-12').click() },
  { name: 'set-large-disabled-ranges', options: heavy, action: selected },
  { name: 'set-5000-unsorted-disabled-dates', options: { disableDates: unsorted }, action: selected },
  { name: 'init-callback-large-rules', options: callbackRules },
  {
    name: 'select-full-10-year-range',
    options: { selectionDatesMode: 'multiple-ranged', selectedDates: ['2016-09-21'], enableEdgeDatesOnly: false },
    action: (cal) => day(cal, '2026-09-21').click(),
  },
  {
    name: 'select-10-year-range-edges',
    options: { selectionDatesMode: 'multiple-ranged', selectedDates: ['2016-09-21'], enableEdgeDatesOnly: true },
    action: (cal) => day(cal, '2026-09-21').click(),
  },
  { name: 'init-popup-31-years', options: popup },
  { name: 'init-12-months-popups', options: { ...multiple, ...popup } },
  { name: 'open-month-picker', options: multiple, action: (cal) => cal.context.mainElement.querySelector('[data-vc="month"]').click() },
  { name: 'open-year-picker', options: multiple, action: (cal) => cal.context.mainElement.querySelector('[data-vc="year"]').click() },
  {
    name: 'keyboard-30-moves',
    options: {},
    action: (cal) => {
      day(cal, '2026-09-12').focus();
      for (let i = 0; i < 30; i++)
        document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: i % 2 ? 'ArrowLeft' : 'ArrowRight', bubbles: true, cancelable: true }));
    },
  },
  {
    name: 'keyboard-30-vertical-moves',
    options: {},
    action: (cal) => {
      day(cal, '2026-09-12').focus();
      for (let i = 0; i < 30; i++)
        document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: i % 2 ? 'ArrowUp' : 'ArrowDown', bubbles: true, cancelable: true }));
    },
  },
  {
    name: 'time-30-updates',
    options: { selectionTimeMode: 12 },
    action: (cal) => {
      const el = cal.context.mainElement.querySelector('[data-vc-time-range="hour"] input');
      for (let i = 0; i < 30; i++) {
        el.value = String(i % 24);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    },
  },
  { name: 'update-8-locales', options: {}, locales: ['en', 'ru', 'de', 'ja', 'fr', 'es', 'zh', 'ar'], action: selected },
];
function mount(Calendar, options) {
  const host = document.createElement('div');
  host.style.cssText = 'width:1200px;position:relative';
  document.body.append(host);
  const cal = new Calendar(host, { ...defaults, ...options });
  return { cal, host };
}
function release(instance) {
  instance.cal.destroy();
  instance.host.remove();
  instance.cal.context.mainElement.remove();
}
const flush = (instance) => instance.cal.context.mainElement.getBoundingClientRect().height;
const errors = [];
window.addEventListener('error', (e) => errors.push(e.message));
window.addEventListener('unhandledrejection', (e) => errors.push(String(e.reason)));
window.scenarioNames = scenarios.map((x) => x.name);
window.sampleScenario = async ({ variant, name, repeat = 1, settled = true }) => {
  const { Calendar } = await import(`/${variant}.mjs`);
  const scenario = scenarios.find((x) => x.name === name);
  if (!scenario) throw new Error(`Unknown scenario: ${name}`);
  const durations = [];
  for (let i = 0; i < repeat; i++) {
    const instances = (scenario.locales ?? [undefined]).map((locale) => mount(Calendar, { ...scenario.options, ...(locale ? { locale } : {}) }));
    if (scenario.action) {
      instances.forEach((x) => x.cal.init());
      instances.forEach(flush);
      if (settled) await settle();
    }
    const start = performance.now();
    instances.forEach((x) => (scenario.action ? scenario.action(x.cal) : x.cal.init()));
    instances.forEach(flush);
    durations.push(performance.now() - start);
    if (settled) await settle();
    instances.forEach(release);
  }
  if (errors.length) throw new Error(JSON.stringify(errors));
  return durations;
};
window.auditReady = true;
