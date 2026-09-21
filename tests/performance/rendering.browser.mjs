const errors = [];
window.addEventListener('error', (event) => errors.push(event.message));
window.addEventListener('unhandledrejection', (event) => errors.push(String(event.reason)));
const defaults = { selectedYear: 2026, selectedMonth: 8, dateToday: '2026-09-21', selectedTime: '12:30', selectedTheme: 'light' };
const equal = (a, b, name) => {
  if (JSON.stringify(a) !== JSON.stringify(b)) throw Error(`${name}: ${JSON.stringify({ actual: a, expected: b }).slice(0, 1500)}`);
};
const dom = (el) =>
  el.nodeType === 3
    ? el.textContent
    : el.nodeType === 1
      ? {
          tag: el.tagName,
          attrs: [...el.attributes].map((a) => [a.name, a.value]).sort(([a], [b]) => a.localeCompare(b)),
          children: [...el.childNodes].map(dom),
          ...(el.tagName === 'INPUT' ? { value: el.value } : {}),
        }
      : null;
const snap = (cal) => ({
  dom: dom(cal.context.mainElement),
  context: JSON.parse(
    JSON.stringify(cal.context, (key, value) =>
      ['mainElement', 'originalElement', 'inputElement', 'cleanupHandlers', 'cleanupInput', 'cleanupSystemTheme'].includes(key)
        ? undefined
        : typeof value === 'function'
          ? undefined
          : value,
    ),
  ),
  focus: cal.context.mainElement.contains(document.activeElement) ? document.activeElement.outerHTML : null,
});
const nav = (cal, direction = 'next') => cal.context.mainElement.querySelector(`[data-vc-arrow="${direction}"]`).click();
const day = (cal, date = '2026-09-12') => cal.context.mainElement.querySelector(`[data-vc-date="${date}"][data-vc-date-month="current"] button`);
async function run(mod, options, fn) {
  const host = document.createElement(options.inputMode ? 'input' : 'div');
  host.style.width = '1200px';
  document.body.append(host);
  const cal = new mod.Calendar(host, { ...defaults, ...options });
  try {
    cal.init();
    return await fn(cal);
  } finally {
    cal.destroy();
    cal.context.mainElement.remove();
    host.remove();
  }
}
window.checkRendering = async () => {
  const baseline = await import('/baseline.mjs'),
    current = await import('/current.mjs');
  const cases = [];
  const compare = async (name, fn) => {
    equal(await fn(current), await fn(baseline), name);
    cases.push(name);
  };
  for (const options of [
    {},
    { type: 'multiple', displayMonthsCount: 12, selectedMonth: 0 },
    { disableWeekdays: [0, 6], enableDates: ['2026-09-13'], enableWeekNumbers: true },
    { selectionMonthsMode: false, selectionYearsMode: false, selectedMonth: 11 },
    { type: 'multiple', displayMonthsCount: 3, selectedMonth: 11, selectionYearsMode: false },
    { selectionDatesMode: 'multiple-ranged', enableEdgeDatesOnly: false, disableDates: ['2026-09-14'] },
    { selectionDatesMode: 'multiple-ranged', enableEdgeDatesOnly: true },
    { disableAllDates: true, enableDates: ['2026-09-01:2026-09-30'] },
    { selectionTimeMode: 12 },
    { selectionTimeMode: 24 },
    { type: 'week' },
    { enableJumpToSelectedDate: true, selectedYear: undefined, selectedMonth: undefined },
    { enableCollapse: true },
    { animation: true },
  ])
    await compare(`set parity ${JSON.stringify(options)}`, (mod) =>
      run(mod, options, (cal) => {
        const states = [];
        for (const dates of [['2026-09-12'], ['2026-09-12', '2026-09-21'], [], ['2027-02-28'], ['2026-09-02:2026-09-25']]) {
          cal.set({ selectedDates: dates });
          states.push(snap(cal));
        }
        return states;
      }),
    );
  for (const count of [2, 3, 12])
    for (const step of [1, 2, 12])
      await compare(`navigation ${count} months, step ${step}`, (mod) =>
        run(
          mod,
          {
            type: 'multiple',
            displayMonthsCount: count,
            monthsToSwitch: step,
            selectedMonth: 10,
            enableWeekNumbers: true,
            disableWeekdays: [0, 6],
            enableDates: ['2026-12-06'],
            selectedDates: ['2026-12-12'],
            selectedHolidays: ['2026-01-01:2027-12-31'],
          },
          (cal) => {
            const states = [];
            for (const direction of ['next', 'next', 'prev', 'prev', 'prev', 'next']) {
              nav(cal, direction);
              states.push(snap(cal));
            }
            return states;
          },
        ),
      );
  await compare('set detects in-place option and context changes', (mod) =>
    run(mod, {}, (cal) => {
      const states = [];
      for (const mutate of [
        () => (cal.styles.dateBtn = 'custom-button'),
        () => cal.selectedHolidays.push('2026-09-12'),
        () => cal.context.disableDates.push('2026-09-12'),
        () => (cal.context.locale.months.long[8] = 'Custom September'),
        () => (cal.labels.month = 'Custom month'),
        () => cal.selectedWeekends.push(4),
      ]) {
        mutate();
        cal.set({ selectedDates: ['2026-09-12'] });
        states.push(snap(cal));
      }
      return states;
    }),
  );
  await compare('external DOM edits persist correctly through navigation then reset on set', (mod) =>
    run(mod, { type: 'multiple', displayMonthsCount: 3 }, (cal) => {
      cal.context.mainElement.querySelector('[data-vc="week"]').append('EXTERNAL');
      day(cal).textContent = 'Edited';
      const states = [];
      nav(cal);
      states.push(snap(cal));
      cal.set({ selectedDates: ['2026-09-12'] });
      states.push(snap(cal));
      return states;
    }),
  );
  for (const mode of ['cell', 'month', 'arrow'])
    await compare(`focus preserved as before ${mode}`, (mod) =>
      run(mod, { type: 'multiple', displayMonthsCount: 3 }, (cal) => {
        const root = cal.context.mainElement;
        const el = mode === 'cell' ? day(cal) : root.querySelector(mode === 'month' ? '[data-vc="month"]' : '[data-vc-arrow="next"]');
        el.focus();
        nav(cal);
        const states = [snap(cal)];
        cal.set({ selectedDates: ['2026-09-12'] });
        states.push(snap(cal));
        return states;
      }),
    );
  await compare('time DOM value reset remains observable on set', (mod) =>
    run(mod, { selectionTimeMode: 24 }, (cal) => {
      cal.context.mainElement.querySelector('input').value = '19';
      cal.set({ selectedDates: ['2026-09-12'] });
      return snap(cal);
    }),
  );
  for (const customized of ['callback', 'sanitizer', 'layout'])
    await compare(`fallback preserves ${customized}`, (mod) => {
      let count = 0;
      const options =
        customized === 'callback'
          ? { onCreateDateEls: () => count++ }
          : customized === 'sanitizer'
            ? {
                sanitizerHTML: (html) => {
                  count++;
                  return html;
                },
              }
            : { layouts: { multiple: '<div>CUSTOM</div><#Multiple><#Month/><#Year/><#Dates/><#/Multiple><#ArrowPrev/><#ArrowNext/>' } };
      return run(mod, { type: 'multiple', displayMonthsCount: 3, ...options }, (cal) => {
        const counts = [count];
        cal.set({ selectedDates: ['2026-09-12'] });
        counts.push(count);
        nav(cal);
        counts.push(count);
        return { counts, state: snap(cal) };
      });
    });
  await compare('onUpdate sees the same state and may reenter set', (mod) => {
    const states = [];
    let reentered = false;
    return run(
      mod,
      {
        onUpdate: (cal) => {
          states.push(snap(cal));
          if (!reentered) {
            reentered = true;
            cal.set({ selectedDates: ['2026-09-21'] });
          }
        },
      },
      (cal) => {
        cal.set({ selectedDates: ['2026-09-12'] });
        return states;
      },
    );
  });
  await compare('explicit reset controls retain original behavior', (mod) =>
    run(mod, {}, (cal) => {
      const states = [];
      for (const reset of [{ dates: false }, { month: false, year: false }, { locale: false }, { dates: 'only-first' }]) {
        cal.set({ selectedDates: ['2026-09-12', '2026-09-21'] }, reset);
        states.push(snap(cal));
      }
      return states;
    }),
  );
  await compare('time zone-sensitive ranges and repeated navigation', (mod) =>
    run(
      mod,
      {
        type: 'multiple',
        displayMonthsCount: 3,
        selectedYear: 2011,
        selectedMonth: 11,
        dateToday: '2011-12-15',
        selectedHolidays: ['2011-11-01:2012-03-31'],
        disableDates: ['2011-12-01:2011-12-10'],
      },
      (cal) => {
        nav(cal);
        nav(cal, 'prev');
        cal.set({ selectedDates: ['2011-12-20'] });
        return snap(cal);
      },
    ),
  );
  await compare('external DOM mutations delivered asynchronously invalidate reuse', (mod) =>
    run(mod, { type: 'multiple', displayMonthsCount: 3 }, async (cal) => {
      day(cal).textContent = 'External edit';
      await Promise.resolve();
      cal.set({ selectedDates: ['2026-09-12'] });
      return snap(cal);
    }),
  );
  for (const count of [1, 3])
    await compare(`input mode set and navigation, ${count} months`, (mod) =>
      run(mod, { inputMode: true, ...(count > 1 ? { type: 'multiple', displayMonthsCount: count } : {}) }, async (cal) => {
        const states = [];
        cal.set({ selectedDates: ['2026-09-12'] });
        states.push(snap(cal));
        cal.context.inputElement.click();
        await new Promise((resolve) => setTimeout(resolve, 30));
        cal.set({ selectedDates: ['2026-09-21'] });
        states.push(snap(cal));
        cal.set({ selectedDates: ['2026-09-12'] });
        states.push(snap(cal));
        if (count > 1) {
          nav(cal);
          states.push(snap(cal));
        }
        cal.hide();
        cal.set({ selectedDates: ['2026-09-21'] });
        states.push(snap(cal));
        return states;
      }),
    );
  const proof = await run(current, { type: 'multiple', displayMonthsCount: 3 }, (cal) => {
    const node = day(cal);
    const october = cal.context.mainElement.querySelector('[data-vc-date="2026-10-12"][data-vc-date-month="current"] button');
    cal.set({ selectedDates: ['2026-09-12'] });
    const sameAfterSet = node === day(cal);
    nav(cal);
    const sameAfterNavigation = october === day(cal, '2026-10-12');
    const stillAttached = october.isConnected;
    if (!sameAfterSet || !sameAfterNavigation || !stillAttached) throw Error('Expected reuse did not occur');
    return { sameAfterSet, sameAfterNavigation, stillAttached };
  });
  equal(errors, [], 'Uncaught browser errors');
  return { passed: true, cases, proof };
};
window.auditReady = true;
