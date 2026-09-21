import type { Calendar, CalendarExtension, Options } from '../../package/src';
import { fixedToday } from '../support/calendar';

type Api = Window & {
  Object: ObjectConstructor;
  Calendar: typeof Calendar;
  calendarExtensions: Record<'motion' | 'timePicker' | 'datePopups', CalendarExtension>;
};
const api = () => cy.window().then((win) => win as unknown as Api);
const injection = `Calendar & <text> " onpointerover="window.__vcpInjected=1" data-injected="'`;

for (const format of ['module', 'script']) {
  describe(`Configuration security (${format})`, () => {
    beforeEach(() => {
      cy.clock(fixedToday, ['Date']);
      cy.visit(format === 'module' ? '/api.html' : '/api-script.html');
      cy.window().its('Calendar').should('be.a', 'function');
    });

    for (const method of ['constructor', 'set']) {
      it(`blocks prototype keys at every merged level in ${method}`, () => {
        api().then((win) => {
          const clean = new win.Calendar('#calendar');
          const prototypes = [Object.getPrototypeOf(clean), Object.getPrototypeOf(clean.labels)];
          const options = JSON.parse(`{
            "__proto__": {"__vcpPolluted": true},
            "labels": {
              "__proto__": {"__vcpPolluted": true},
              "arrowNext": {"__proto__": {"__vcpPolluted": true}, "month": "Next"},
              "constructor": {"prototype": {"__vcpPolluted": true}},
              "prototype": {"__vcpPolluted": true}
            },
            "selectedMonth": 5
          }`);
          let instance: Calendar;
          let polluted: boolean;
          try {
            instance = method === 'constructor' ? new win.Calendar('#calendar', options) : clean;
            if (method === 'set') instance.set(options);
            polluted = prototypes.some((prototype) => prototype.__vcpPolluted === true);
          } finally {
            // Isolate the regression even if tested against a vulnerable build.
            for (const prototype of prototypes) delete prototype.__vcpPolluted;
          }
          expect(polluted).to.equal(false);
          expect(Object.hasOwn(instance.labels, 'constructor')).to.equal(false);
          expect(Object.hasOwn(instance.labels, 'prototype')).to.equal(false);
          expect(instance.labels.arrowNext.month).to.equal('Next');
          expect(instance.selectedMonth).to.equal(5);
          expect(instance.constructor).to.equal(win.Calendar);
          instance.init();
          instance.destroy();
        });
      });
    }

    it('keeps nested default labels private to each calendar', () => {
      api().then((win) => {
        const first = new win.Calendar('#calendar');
        const second = new win.Calendar('#input');
        const previous = second.labels.arrowNext.month;
        first.set({ labels: { arrowNext: { month: injection }, arrowPrev: { week: 'Back' } } });
        const third = new win.Calendar('#outside');
        expect(second.labels.arrowNext.month).to.equal(previous);
        expect(third.labels.arrowNext.month).to.equal(previous);
        expect(first.labels.arrowNext).not.to.equal(second.labels.arrowNext);
        expect(first.labels.arrowPrev).not.to.equal(second.labels.arrowPrev);
      });
    });

    for (const method of ['constructor', 'set']) {
      it(`does not expose live context or instance methods through ${method} options`, () => {
        api().then((win) => {
          const options = JSON.parse(`{
            "context": {"mainElement": {"innerHTML": "<div data-injected>Injected</div>"}},
            "init": null, "update": null, "destroy": null, "show": null, "hide": null, "set": null,
            "queryAndMemoize": null,
            "selectedMonth": 5
          }`);
          const instance = new win.Calendar('#calendar', method === 'constructor' ? options : undefined);
          if (method === 'set') {
            instance.init();
            instance.set(options);
          }
          expect(win.document.querySelector('[data-injected]')).to.equal(null);
          for (const key of ['init', 'update', 'destroy', 'show', 'hide', 'set'] as const) expect(instance[key]).to.be.a('function');
          expect(instance.selectedMonth).to.equal(5);
          if (method === 'constructor') instance.init();
          instance.destroy();
        });
      });
    }

    for (const type of ['default', 'multiple', 'month', 'year', 'week'] as const) {
      it(`treats labels and style names as literal attributes in the ${type} view`, () => {
        api().then((win) => {
          const instance = new win.Calendar('#calendar', {
            type,
            extensions: [win.calendarExtensions.motion, win.calendarExtensions.timePicker],
            enableWeekNumbers: true,
            enableCollapse: type === 'default' || type === 'week',
            selectionTimeMode: 12,
          });
          for (const key of Object.keys(instance.labels) as Array<keyof typeof instance.labels>) {
            if (key === 'arrowNext' || key === 'arrowPrev') {
              instance.labels[key] = { month: injection, year: injection, week: injection };
            } else instance.labels[key] = injection;
          }
          for (const key of Object.keys(instance.styles) as Array<keyof typeof instance.styles>) instance.styles[key] = injection;
          instance.init();
          const root = instance.context.mainElement;
          expect(root.querySelector('[onpointerover], [data-injected], text')).to.equal(null);
          expect(root.getAttribute('aria-label')).to.equal(injection);
          for (const element of root.querySelectorAll(
            '[data-vc="dates"], [data-vc="months"], [data-vc="years"], [data-vc="time"], [data-vc="collapse"], [data-vc-arrow]',
          )) {
            expect(element.getAttribute('aria-label')).to.contain(injection);
          }
          // Re-rendering paths must preserve the same boundary.
          instance.set({ labels: { dates: injection }, styles: { dates: injection } });
          expect(root.querySelector('[onpointerover], [data-injected], text')).to.equal(null);
          instance.destroy();
        });
      });
    }

    it('does not interpret forged numeric time settings as HTML', () => {
      api().then((win) => {
        const instance = new win.Calendar('#calendar', {
          extensions: [win.calendarExtensions.timePicker],
          selectionTimeMode: 24,
          timeMinHour: injection,
          timeMinMinute: injection,
          timeMaxHour: injection,
          timeMaxMinute: injection,
          timeStepHour: injection,
          timeStepMinute: injection,
        } as unknown as Options);
        instance.init();
        expect(instance.context.mainElement.querySelector('[onpointerover], [data-injected], text')).to.equal(null);
        instance.destroy();
      });
    });

    it('keeps custom month and weekday names as text', () => {
      api().then((win) => {
        const instance = new win.Calendar('#calendar', {
          locale: {
            months: { short: Array(12).fill(injection), long: Array(12).fill(injection) },
            weekdays: { short: Array(7).fill(injection), long: Array(7).fill(injection) },
          },
          onClickWeekDay() {},
        });
        instance.init();
        const root = instance.context.mainElement;
        expect(root.querySelector('[onpointerover], [data-injected], text')).to.equal(null);
        expect(root.querySelector('[data-vc="month"]')?.textContent).to.equal(injection);
        expect(root.querySelector('[data-vc-week-day-btn]')?.textContent).to.equal(injection);
        instance.set({ type: 'month' });
        expect(root.querySelector('[data-vc-months-month]')?.textContent).to.equal(injection);
        instance.destroy();
      });
    });

    it('passes range-tooltip HTML through the sanitizer', () => {
      api().then((win) => {
        const instance = new win.Calendar('#calendar', {
          selectionDatesMode: 'multiple-ranged',
          selectedDates: ['2024-06-20'],
          onCreateDateRangeTooltip: () => '<b data-user-content>Range</b>',
          sanitizerHTML: (html) => html.replace(/data-user-content/g, 'data-sanitized-content'),
        });
        instance.init();
      });
      cy.get('[data-vc-date="2024-06-23"] [data-vc-date-btn]').trigger('mousemove');
      cy.get('[data-vc-date-range-tooltip] [data-sanitized-content]').should('have.text', 'Range');
      cy.get('[data-user-content]').should('not.exist');
    });

    it('resolves only declared layout components without Object.hasOwn', () => {
      api().then((win) => {
        cy.stub(win.Object, 'hasOwn').value(undefined);
        const instance = new win.Calendar('#calendar', {
          layouts: { default: '<#constructor /><#__proto__ /><#toString /><#hasOwnProperty /><#Dates />' },
        });
        instance.init();
        expect(instance.context.mainElement.querySelector('[data-vc="dates"]')).not.to.equal(null);
        expect(instance.context.mainElement.textContent).not.to.contain('[object Object]');
        instance.destroy();
      });
    });

    it('preserves trusted popup/layout HTML and calls the configured sanitizer', () => {
      api().then((win) => {
        const sanitizer = cy.spy((html: string) => html.replace(/data-user-content/g, 'data-sanitized-content'));
        const instance = new win.Calendar('#calendar', {
          extensions: [win.calendarExtensions.datePopups],
          layouts: { default: '<div data-user-content="layout"><#Dates /></div>' },
          popups: { '2024-06-20': { html: '<strong data-user-content="popup">Event &amp; details</strong>' } },
          sanitizerHTML: sanitizer,
        });
        instance.init();
        const root = instance.context.mainElement;
        expect(root.querySelector('[data-user-content]')).to.equal(null);
        expect(root.querySelector('[data-sanitized-content="layout"]')).not.to.equal(null);
        expect(root.querySelector('[data-vc-date-popup] strong')?.textContent).to.equal('Event & details');
        expect(sanitizer).to.have.been.calledWith('<strong data-user-content="popup">Event &amp; details</strong>');
        instance.destroy();
      });
    });
  });
}
