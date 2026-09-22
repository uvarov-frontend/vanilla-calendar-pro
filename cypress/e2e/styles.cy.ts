import type { Calendar, CalendarExtension, Options } from '../../package/src';
import { fixedToday } from '../support/calendar';

type Feature = CalendarExtension['name'];
type Api = Window & {
  Calendar: typeof Calendar;
  calendarExtensions: Record<Feature, CalendarExtension>;
};
const features: Feature[] = ['motion', 'time', 'annotations', 'weeks', 'months'];
const parts = ['core', ...features];
const profiles: Array<{ name: string; features: Feature[]; options: Options; shadow?: boolean; overrides?: boolean }> = [
  { name: 'core and date states', features: [], options: { selectionDatesMode: 'multiple-ranged', selectedDates: ['2024-06-18', '2024-06-24'] } },
  { name: 'month picker', features: [], options: { type: 'month' } },
  { name: 'year picker', features: [], options: { type: 'year' } },
  { name: 'input', features: [], options: { inputMode: true } },
  { name: '12-hour editor', features: ['time'], options: { selectionTimeMode: 12, selectedTime: '10:30 AM' } },
  {
    name: 'annotations',
    features: ['annotations'],
    options: {
      selectionDatesMode: 'multiple-ranged',
      selectedDates: ['2024-06-18', '2024-06-24'],
      popups: { '2024-06-20': { html: '<a href="#sponsor">Sponsor</a>' } },
      onCreateDateRangeTooltip: () => 'Dates',
    },
  },
  { name: 'weeks without motion', features: ['weeks'], options: { type: 'week', enableWeekNumbers: true, enableCollapse: true, onClickWeekDay() {} } },
  { name: 'motion and collapse', features: ['motion', 'weeks'], options: { animation: true, enableSwipe: true, enableCollapse: true } },
  { name: 'multiple months', features: ['months'], options: { type: 'multiple', displayMonthsCount: 2 } },
  {
    name: 'all features and inherited overrides',
    features,
    options: {
      type: 'multiple',
      displayMonthsCount: 2,
      enableWeekNumbers: true,
      onClickWeekDay() {},
      selectionTimeMode: 24,
      animation: true,
      enableSwipe: true,
      popups: { '2024-06-20': { html: '<a href="#sponsor">Sponsor</a>' } },
    },
    overrides: true,
  },
  {
    name: 'renamed classes',
    features: ['time'],
    options: { selectionTimeMode: 24, styles: { dateBtn: 'custom-date', calendar: 'custom-calendar' } },
    overrides: true,
  },
  { name: 'Shadow DOM', features: ['time', 'weeks'], options: { selectionTimeMode: 24, enableWeekNumbers: true }, shadow: true, overrides: true },
];

// Include geometry, painting, interaction, typography and pseudo-elements. Values are compared
// in the same browser/document so fonts and native widgets need no platform-specific snapshots.
const properties = `display position box-sizing width height min-width min-height max-width max-height top right bottom left z-index
padding-top padding-right padding-bottom padding-left margin-top margin-right margin-bottom margin-left gap row-gap column-gap
flex-direction flex-grow flex-shrink flex-basis align-items align-content justify-content justify-items grid-template-columns grid-template-rows grid-auto-flow
color background-color background-image background-position background-repeat background-size box-shadow opacity visibility overflow-x overflow-y
border-top-width border-right-width border-bottom-width border-left-width border-top-color border-right-color border-bottom-color border-left-color border-top-style
border-top-left-radius border-top-right-radius border-bottom-left-radius border-bottom-right-radius outline-color outline-style outline-width outline-offset
font-family font-size font-weight line-height text-align white-space word-break content transform cursor pointer-events touch-action user-select appearance`.split(
  /\s+/,
);

const snapshot = (win: Window, main: HTMLElement) => {
  const nodes = [main, ...main.querySelectorAll<HTMLElement>('*')];
  return nodes.flatMap((node, index) =>
    ['', '::before', '::after'].map((pseudo) => {
      const style = win.getComputedStyle(node, pseudo || null);
      return { node: `${index}:${node.tagName}.${node.className}${pseudo}`, values: properties.map((property) => style.getPropertyValue(property)) };
    }),
  );
};

const compare = (actual: ReturnType<typeof snapshot>, expected: ReturnType<typeof snapshot>, label: string) => {
  expect(actual.length, `${label}: element count`).to.equal(expected.length);
  const differences: string[] = [];
  for (let index = 0; index < expected.length; index++) {
    properties.forEach((property, propertyIndex) => {
      const before = expected[index].values[propertyIndex];
      const after = actual[index].values[propertyIndex];
      if (before !== after && differences.length < 12) differences.push(`${expected[index].node} ${property}: ${before} → ${after}`);
    });
  }
  expect(differences, label).to.deep.equal([]);
};

// CSS pseudo-state emulation is local to this fixture. Native hover/focus behavior is additionally
// covered by native.mjs; this makes all media/pseudo declarations comparable in every browser.
const pseudoStates = (css: string) => css.replaceAll(':hover', '[data-test-hover]').replaceAll(':focus-visible', '[data-test-focus]');
const settle = (win: Window) => new Promise<void>((resolve) => win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve())));

for (const theme of ['light', 'dark', 'slate-light']) {
  describe(`Modular CSS parity: ${theme}`, () => {
    for (const profile of profiles) {
      it(profile.name, () => {
        cy.clock(fixedToday, ['Date']);
        cy.visit('/api.html');
        cy.window().its('Calendar').should('be.a', 'function');
        cy.window().then({ timeout: 30000 }, async (window) => {
          const win = window as unknown as Api;
          const document = win.document;
          const chosen = ['core', ...profile.features];
          const variants: Record<string, string[]> = {
            full: ['layout.css', `themes/${theme}.css`],
            selected: [...chosen.map((part) => `layout/${part}.css`), ...chosen.map((part) => `themes/${theme}/${part}.css`)],
            reversed: [...chosen.toReversed().map((part) => `themes/${theme}/${part}.css`), ...chosen.toReversed().map((part) => `layout/${part}.css`)],
            all: [...parts.map((part) => `layout/${part}.css`), ...parts.map((part) => `themes/${theme}/${part}.css`)],
          };
          if (theme !== 'slate-light') {
            variants.combined = chosen.map((part) => `${part}.css`);
            variants.index = ['index.css'];
          }
          const referenceFiles = ['layout.css', `themes/${theme}.css`];
          const paths = [
            ...new Set(
              Object.values(variants)
                .flat()
                .map((file) => `/package/styles/${file}`),
            ),
            ...referenceFiles.map((file) => `/reference-styles/${file}`),
          ];
          const sources = new Map(
            await Promise.all(
              paths.map(async (path) => {
                const response = await win.fetch(`${path}?direct`);
                expect(response.ok, path).to.equal(true);
                return [path, pseudoStates(await response.text())] as const;
              }),
            ),
          );
          document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]').forEach((link) => {
            link.disabled = true;
          });
          const container = document.querySelector<HTMLElement>('#calendar')!;
          const root: HTMLElement | ShadowRoot = profile.shadow ? container.attachShadow({ mode: 'open' }) : document.head;
          const sheet = document.createElement('style');
          root.appendChild(sheet);
          const overrides = document.createElement('style');
          // Freeze visual transitions only while inspecting static states.
          overrides.textContent = '*,:before,:after{transition:none!important;animation:none!important}';
          if (profile.overrides)
            overrides.textContent += `
            :root,:host {--vc-date-color:#123456;--vc-date-selected-bg:#ab12ef;--vc-bg:#f4f5f6;--vc-time-input-color:#654321;--vc-week-number-color:#789abc;--vc-title-color:#012345}
            [data-vc="calendar"] {--vc-date-weekend-color:#987654;--vc-time-range-track-color:#132435}
            [data-vc-date-btn] {--vc-date-selected-color:#fedcba}
            .custom-date {background:#123456;color:#fefefe}
          `;
          root.appendChild(overrides);
          sheet.textContent = referenceFiles.map((file) => sources.get(`/reference-styles/${file}`)).join('\n');
          let target = profile.options.inputMode ? document.querySelector<HTMLElement>('#input')! : container;
          if (profile.shadow) {
            target = document.createElement('div');
            root.appendChild(target);
          }
          const calendar = new win.Calendar(target, {
            ...profile.options,
            extensions: profile.features.map((name) => win.calendarExtensions[name]),
            selectedTheme: theme,
          });
          calendar.init();
          if (profile.options.inputMode) calendar.show();
          await settle(win);
          const main = calendar.context.mainElement;
          expect(main.isConnected).to.equal(true);
          // Populate every range edge, outside-month, weekend/holiday/today/disabled combination
          // without changing the stylesheet or depending on the current month arrangement.
          main.querySelectorAll<HTMLElement>('[data-vc-date]').forEach((date, index) => {
            for (const [flag, bit] of [
              ['today', 1],
              ['weekend', 2],
              ['holiday', 4],
              ['disabled', 8],
            ] as const)
              date.toggleAttribute(`data-vc-date-${flag}`, !!(index & bit));
            date.setAttribute('data-vc-date-month', ['current', 'prev', 'next'][index % 3]);
            const range = ['', 'first', 'middle', 'last', 'first-and-last'][index % 5];
            if (range) date.setAttribute('data-vc-date-selected', range);
            else date.removeAttribute('data-vc-date-selected');
            if (index % 2) date.setAttribute('data-vc-date-hover', range || 'middle');
          });
          main.querySelectorAll<HTMLElement>('[data-vc-months-month], [data-vc-years-year], input, [data-vc-time="keeping"]').forEach((node, index) => {
            if (index % 3 === 0) node.setAttribute('disabled', '');
            if (index % 3 === 1) node.setAttribute('data-vc-input-focus', '');
          });
          if (profile.features.includes('motion')) {
            main.setAttribute('data-vc-dragging', '');
            const dates = main.querySelector<HTMLElement>('[data-vc="dates"]');
            dates?.setAttribute('data-vc-collapsing', '');
            dates?.setAttribute('data-vc-clip', '');
            const ghost = document.createElement('div');
            ghost.setAttribute('data-vc-ghost', '');
            main.appendChild(ghost);
          }
          if (profile.features.includes('annotations')) {
            main.querySelector('[data-vc-date-range-tooltip]')?.setAttribute('data-vc-date-range-tooltip', 'visible');
          }
          const nodes = [main, ...main.querySelectorAll<HTMLElement>('*')];
          const capture = () => {
            const normal = snapshot(win, main);
            nodes.forEach((node) => {
              node.setAttribute('data-test-hover', '');
              node.setAttribute('data-test-focus', '');
            });
            const interactive = snapshot(win, main);
            nodes.forEach((node) => {
              node.removeAttribute('data-test-hover');
              node.removeAttribute('data-test-focus');
            });
            return { normal, interactive };
          };
          const expected = capture();
          for (const [name, files] of Object.entries(variants)) {
            sheet.textContent = files.map((file) => sources.get(`/package/styles/${file}`)).join('\n');
            const actual = capture();
            compare(actual.normal, expected.normal, `${theme}/${profile.name}/${name}/normal`);
            compare(actual.interactive, expected.interactive, `${theme}/${profile.name}/${name}/hover+focus`);
          }
          calendar.destroy();
        });
      });
    }
  });
}
