import type { Calendar, CalendarExtension, Options } from '../../package/src';
import { arrow, day, fixedToday, hour } from '../support/calendar';
import { syntheticPointerCapture } from '../support/pointerCapture';

type Api = Window & {
  Calendar: typeof Calendar;
  calendarExtensions: Record<'motion' | 'timePicker' | 'datePopups', CalendarExtension>;
  instance: Calendar;
};
const api = () => cy.window().then((win) => win as unknown as Api);
const mount = (names: Array<keyof Api['calendarExtensions']>, options: Options = {}) =>
  api().then((win) => {
    win.instance = new win.Calendar(options.inputMode ? '#input' : '#calendar', {
      extensions: names.map((name) => win.calendarExtensions[name]),
      ...options,
    });
    win.instance.init();
  });

describe('Explicit ESM extensions', () => {
  beforeEach(() => {
    cy.clock(fixedToday, ['Date']);
    cy.visit('/api.html', { onBeforeLoad: syntheticPointerCapture });
    cy.window().its('Calendar').should('be.a', 'function');
  });

  it('keeps input, range selection, month/year selection and week view in core', () => {
    mount([], { inputMode: true, selectionDatesMode: 'multiple-ranged' });
    cy.get('#input').click();
    day('2024-06-20').click();
    day('2024-06-23').click();
    api().then(({ instance }) => {
      expect(instance.extensions).to.have.length(0);
      expect(instance.context.selectedDates).to.deep.equal(['2024-06-20', '2024-06-23']);
    });
    cy.get('[data-vc="month"]').click();
    cy.get('[data-vc-months-month="6"]').click();
    cy.get('[data-vc="year"]').click();
    cy.get('[data-vc-years-year="2025"]').click();
    api().then(({ instance }) => instance.set({ type: 'week' }));
    cy.get('[data-vc="dates"] [data-vc-date]').should('have.length', 7);
  });

  for (const [option, name, value] of [
    ['animation', 'motion', true],
    ['enableSwipe', 'motion', true],
    ['enableCollapse', 'motion', true],
    ['selectionTimeMode', 'timePicker', 24],
    ['popups', 'datePopups', { '2024-06-20': { modifier: 'event' } }],
  ] as const) {
    it(`rejects missing ${name} for ${option} before init/set mutate the calendar`, () => {
      api().then((win) => {
        const options = { [option]: value };
        const calendar = new win.Calendar('#calendar', options);
        expect(() => calendar.init()).to.throw(`requires ${name}`);
        expect(calendar.context.isInit).not.to.equal(true);
        expect(win.document.querySelector('#calendar')!.innerHTML).to.equal('');
        // A fresh instance also verifies atomic set() on an already rendered calendar.
        win.instance = new win.Calendar('#calendar');
        win.instance.init();
        const before = win.instance.context.mainElement.innerHTML;
        expect(() => win.instance.set(options)).to.throw(`requires ${name}`);
        expect(win.instance.context.mainElement.innerHTML).to.equal(before);
        expect(win.instance[option]).not.to.deep.equal(value);
      });
    });
  }

  it('validates input options before installing delayed opening handlers', () => {
    api().then((win) => {
      const calendar = new win.Calendar('#input', { inputMode: true, selectionTimeMode: 12 });
      expect(() => calendar.init()).to.throw('requires timePicker');
      expect(calendar.context.isInit).not.to.equal(true);
    });
    cy.get('#input').click();
    cy.get('[data-vc-input]').should('not.exist');
  });

  it('allows inactive settings and callbacks without extensions', () => {
    mount([], {
      animation: false,
      enableSwipe: false,
      enableCollapse: false,
      selectionTimeMode: false,
      selectedTime: '10:30',
      timeMinHour: 8,
      popups: {},
      onChangeTime() {},
    });
    arrow('next').click();
    api().then(({ instance }) => instance.update());
    cy.get('[data-vc="time"], [data-vc="collapse"], [data-vc-date-popup]').should('not.exist');
  });

  it('does not enable features or bind gesture listeners just by registering modules', () => {
    api().then((win) => {
      const host = win.document.querySelector<HTMLElement>('#calendar')!;
      const add = cy.spy(host, 'addEventListener');
      win.instance = new win.Calendar(host, { extensions: Object.values(win.calendarExtensions) });
      win.instance.init();
      expect(add.getCalls().filter((call) => call.args[0] === 'pointerdown')).to.have.length(0);
      expect(win.instance.animation).to.equal(false);
      expect(win.instance.selectionTimeMode).to.equal(false);
    });
    cy.get('[data-vc="time"], [data-vc="collapse"], [data-vc-date-popup]').should('not.exist');
  });

  it('shares immutable descriptions safely, snapshots arrays and deduplicates registration', () => {
    api().then((win) => {
      const { motion, timePicker } = win.calendarExtensions;
      const extensions = [motion, motion, timePicker];
      const options = { extensions, enableSwipe: true, selectionTimeMode: 24 as const };
      const first = new win.Calendar('#calendar', options);
      const host = win.document.createElement('div');
      win.document.body.appendChild(host);
      const second = new win.Calendar(host, options);
      first.init();
      second.init();
      expect(first.extensions).to.have.length(2);
      expect(Object.isFrozen(first.extensions)).to.equal(true);
      expect(Object.isFrozen(motion)).to.equal(true);
      first.set(options); // Reusing an options object, including duplicates, is supported.
      extensions.length = 0;
      first.set({ selectedTime: '13:45' });
      expect(second.context.selectedTime).to.equal('00:00');
      first.destroy();
      second.set({ selectedTime: '09:15' });
      expect(second.context.selectedTime).to.equal('09:15');
      second.context.mainElement.querySelector<HTMLElement>('[data-vc-arrow="next"]')!.click();
      expect(second.context.selectedMonth).to.equal(6);
      second.destroy();
    });
  });

  it('rejects changes to extension composition and permits the same set in a different order', () => {
    mount(['motion', 'timePicker']);
    api().then(({ instance, calendarExtensions: { motion, timePicker, datePopups } }) => {
      instance.set({ extensions: [timePicker, motion, motion] });
      expect(() => instance.set({ extensions: [] })).to.throw('fixed at construction');
      expect(() => instance.set({ extensions: [motion, timePicker, datePopups] })).to.throw('fixed at construction');
      expect(instance.extensions).to.have.length(2);
      instance.animation = true;
      instance.update();
    });
  });

  it('validates direct option changes on update()', () => {
    mount([]);
    api().then(({ instance }) => {
      instance.animation = true;
      expect(() => instance.update()).to.throw('requires motion');
      instance.animation = false;
      instance.update();
    });
  });

  it('can toggle time repeatedly and releases listeners on replaced and destroyed fields', () => {
    mount(['timePicker']);
    api().then(({ instance }) => instance.set({ selectionTimeMode: 24, selectedTime: '10:30' }));
    hour().should('have.value', '10');
    api().then(({ instance }) => {
      const old = instance.context.mainElement.querySelector<HTMLInputElement>('[data-vc-time-input="hour"] input')!;
      instance.set({ selectionTimeMode: 12, selectedTime: '02:15 PM' });
      old.value = '23';
      old.dispatchEvent(new Event('change', { bubbles: true }));
      expect(instance.context.selectedTime).to.equal('02:15 PM');
      const current = instance.context.mainElement.querySelector<HTMLInputElement>('[data-vc-time-input="hour"] input')!;
      instance.destroy();
      current.value = '08';
      current.dispatchEvent(new Event('change', { bubbles: true }));
      expect(instance.context.selectedTime).to.equal('02:15 PM');
    });
  });

  it('enables and disables gestures through set() without accumulating handlers', () => {
    mount(['motion']);
    api().then(({ instance }) => {
      const host = instance.context.mainElement;
      const add = cy.spy(host, 'addEventListener');
      const remove = cy.spy(host, 'removeEventListener');
      instance.set({ enableSwipe: true, enableCollapse: true });
      instance.set({ selectedDates: ['2024-06-20'] });
      instance.set({ enableSwipe: false, enableCollapse: false });
      expect(add.getCalls().filter((call) => call.args[0] === 'pointerdown')).to.have.length(1);
      expect(remove.getCalls().filter((call) => call.args[0] === 'pointerdown')).to.have.length(1);
      instance.set({ enableCollapse: true });
    });
    cy.get('[data-vc="collapse"]').click();
    cy.get('[data-vc="calendar"]').should('have.attr', 'data-vc-type', 'week');
  });

  it('keeps popups, modifiers and sanitized labels working with only datePopups', () => {
    mount(['datePopups'], {
      popups: { '2024-06-20:2024-06-22': { modifier: 'event', html: '<b>Meeting</b>' } },
      sanitizerHTML: (html) => html.replace('Meeting', 'Appointment'),
    });
    day('2024-06-20').should('have.class', 'event').and('have.attr', 'aria-label').and('contain', 'Appointment');
    cy.get('[data-vc-date-popup]').should('have.length', 3);
    api().then(({ instance }) => instance.set({ popups: { '2024-06-20:2024-06-22': { html: '', modifier: '' } } }));
    cy.get('[data-vc-date-popup]').should('not.exist');
  });

  it('supports all extensions on an input configured before its first opening', () => {
    mount(['motion', 'timePicker', 'datePopups'], { inputMode: true });
    api().then(({ instance }) =>
      instance.set({ enableCollapse: true, selectionTimeMode: 24, selectedTime: '09:15', popups: { '2024-06-20': { html: 'Event' } } }),
    );
    cy.get('#input').click();
    hour().should('have.value', '09');
    cy.get('[data-vc-date-popup]').should('have.length', 1);
    cy.get('[data-vc="collapse"]').click();
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-type', 'week');
    api().then(({ instance }) => instance.destroy());
    cy.get('[data-vc-input]').should('not.exist');
  });

  it('does not attach keyboard or motion handlers after destruction inside onInit', () => {
    api().then((win) => {
      const host = win.document.querySelector<HTMLElement>('#calendar')!;
      let add: ReturnType<typeof cy.spy>;
      const instance = new win.Calendar(host, {
        extensions: [win.calendarExtensions.motion],
        enableSwipe: true,
        onInit(self) {
          self.destroy();
          add = cy.spy(self.context.mainElement, 'addEventListener');
        },
      });
      instance.init();
      expect(add!).not.to.have.been.called;
      expect(instance.context.isDestroyed).to.equal(true);
    });
  });
});
