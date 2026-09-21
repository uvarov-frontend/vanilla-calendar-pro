import type { Calendar, Options } from '../../package/src';
import { arrow, calendar, day, fixedToday, hour, minute, range, selected } from '../support/calendar';

type CalendarWindow = Window & { Calendar: typeof Calendar; instance: Calendar; Date: DateConstructor };
const api = () => cy.window().then((win) => win as unknown as CalendarWindow);
const mount = (options: Options = {}, input = false) =>
  api().then((win) => {
    win.instance = new win.Calendar(win.document.querySelector<HTMLElement>(input ? '#input' : '#calendar')!, options);
    win.instance.init();
    return win.instance;
  });
const use = (callback: (instance: Calendar) => void) => api().then((win) => callback(win.instance));

beforeEach(() => {
  cy.clock(fixedToday, ['Date']);
  cy.visit('/api.html');
  cy.window().its('Calendar').should('be.a', 'function');
});

describe('Public methods and callbacks on the packed calendar', () => {
  it('applies set() before init and supports element/selector constructors', () => {
    api().then((win) => {
      win.instance = new win.Calendar('#calendar');
      win.instance.set({ locale: 'de-AT', selectedMonth: 0, selectedYear: 2024, selectedDates: ['2024-01-15'] });
      win.instance.init();
    });
    selected(['2024-01-15']);
    cy.get('[data-vc="month"]').should('have.text', 'Jänner');
  });

  it('set() replaces date arrays and preserves unspecified nested labels', () => {
    mount({ selectedDates: ['2024-06-20'], labels: { arrowNext: { month: 'Forward' } } });
    use((instance) => instance.set({ selectedDates: ['2024-06-22'], labels: { arrowPrev: { month: 'Back' } } }));
    selected(['2024-06-22']);
    arrow('next').should('have.attr', 'aria-label', 'Forward');
    arrow('prev').should('have.attr', 'aria-label', 'Back');
  });

  it('update() applies mutations and resets selection to configured defaults', () => {
    mount({ selectedDates: ['2024-06-20'] });
    day('2024-06-22').click();
    selected(['2024-06-22']);
    use((instance) => {
      instance.locale = 'de-AT';
      instance.update();
    });
    selected(['2024-06-20']);
    cy.get('[data-vc="month"]').should('have.text', 'Juni');
  });

  it('set() can preserve the user-selected month, year, date and time', () => {
    mount({ selectedDates: ['2024-06-20'], selectionTimeMode: 24, selectedTime: '09:15' });
    arrow('next').click();
    day('2024-07-22').click();
    hour().clear().type('18').blur();
    use((instance) => instance.set({ locale: 'de-AT' }, { dates: false, month: false, year: false, time: false }));
    selected(['2024-07-22']);
    cy.get('[data-vc="month"]').should('have.text', 'Juli');
    hour().should('have.value', '18');
    minute().should('have.value', '15');
  });

  it('only-first reset keeps the earliest date and reopens range selection', () => {
    mount({ selectionDatesMode: 'multiple-ranged' });
    day('2024-06-24').click();
    day('2024-06-21').click();
    selected(['2024-06-21', '2024-06-22', '2024-06-23', '2024-06-24']);
    use((instance) => instance.update({ dates: 'only-first' }));
    selected(['2024-06-21']);
    day('2024-06-26').trigger('mousemove');
    day('2024-06-26').parent().should('have.attr', 'data-vc-date-hover', 'last');
    day('2024-06-23').click();
    selected(['2024-06-21', '2024-06-22', '2024-06-23']);
  });

  it('notices in-place changes to disabled and enabled date rules on update', () => {
    const disabled = ['2024-06-20'];
    mount({ disableDates: disabled });
    day('2024-06-20').should('be.disabled');
    use((instance) => {
      disabled.splice(0, 1, '2024-06-21');
      instance.update();
    });
    day('2024-06-20').should('not.be.disabled');
    day('2024-06-21').should('be.disabled');
    use((instance) => instance.set({ disableAllDates: true, enableDates: ['2024-06-22'] }));
    day('2024-06-20').should('be.disabled');
    day('2024-06-22').click();
    selected(['2024-06-22']);
  });

  it('calls lifecycle and selection callbacks with current context exactly once', () => {
    const events: string[] = [];
    mount({
      onInit: () => events.push('init'),
      onClickDate: (self, event) => events.push(`date:${self.context.selectedDates[0]}:${event.type}`),
      onUpdate: () => events.push('update'),
      onDestroy: () => events.push('destroy'),
    });
    day('2024-06-20').click();
    use((instance) => {
      instance.update();
      instance.destroy();
    });
    cy.then(() => expect(events).to.deep.equal(['init', 'date:2024-06-20:click', 'update', 'destroy']));
  });

  it('restores host content and permits a fresh calendar with the same selector after destroy', () => {
    api().then((win) => {
      win.document.querySelector('#calendar')!.innerHTML = '<span>Original content</span>';
    });
    mount();
    use((instance) => instance.destroy());
    cy.get('#calendar').should('have.html', '<span>Original content</span>').and('not.have.attr', 'data-vc');
    api().then((win) => {
      win.instance = new win.Calendar('#calendar', { selectedDates: ['2024-06-21'] });
      win.instance.init();
    });
    selected(['2024-06-21']);
    day('2024-06-22').click();
    selected(['2024-06-22']);
  });

  it('keeps two independent calendars and their configuration separate', () => {
    mount({ selectedTheme: 'dark', selectedDates: ['2024-06-20'] });
    api().then((win) => {
      const host = win.document.createElement('div');
      host.id = 'second';
      win.document.body.append(host);
      new win.Calendar(host, { selectedTheme: 'light', selectedDates: ['2024-06-21'] }).init();
    });
    cy.get('#calendar [data-vc-date="2024-06-22"] button').click();
    cy.get('#second [data-vc-date-selected]').should('have.attr', 'data-vc-date', '2024-06-21');
    cy.get('#calendar').should('have.attr', 'data-vc-theme', 'dark');
    cy.get('#second').should('have.attr', 'data-vc-theme', 'light');
  });

  it('can change locale and selection mode repeatedly without duplicate callbacks', () => {
    const click = cy.stub().as('click');
    mount({ onClickDate: click });
    use((instance) => {
      for (const locale of ['de-AT', 'en', 'fr', 'en']) instance.set({ locale });
      instance.set({ selectionDatesMode: 'multiple' });
    });
    day('2024-06-20').click();
    day('2024-06-21').click();
    selected(['2024-06-20', '2024-06-21']);
    cy.get('@click').should('have.been.calledTwice');
  });
});

describe('Date selection boundaries', () => {
  it('includes leap day and navigates across February and the year boundary', () => {
    mount({ selectedYear: 2024, selectedMonth: 1 });
    day('2024-02-29').click();
    selected(['2024-02-29']);
    arrow('next').click();
    cy.get('[data-vc="month"]').should('have.attr', 'data-vc-month', '2');
    use((instance) => instance.set({ selectedYear: 2024, selectedMonth: 11 }));
    arrow('next').click();
    cy.get('[data-vc="year"]').should('have.attr', 'data-vc-year', '2025');
    cy.get('[data-vc="month"]').should('have.attr', 'data-vc-month', '0');
    arrow('prev').click();
    cy.get('[data-vc="year"]').should('have.attr', 'data-vc-year', '2024');
  });

  it('respects min/max inside the same month', () => {
    mount({ dateMin: '2024-06-10', dateMax: '2024-06-25' });
    day('2024-06-09').should('be.disabled');
    selected([]);
    day('2024-06-26').should('be.disabled');
    day('2024-06-10').click();
    selected(['2024-06-10']);
    day('2024-06-25').click();
    selected(['2024-06-25']);
    arrow('prev').should('not.be.visible');
    arrow('next').should('not.be.visible');
  });

  it('supports Date objects and numeric timestamps in options', () => {
    api().then((win) => {
      win.instance = new win.Calendar('#calendar', {
        dateMin: new win.Date(2024, 5, 10),
        dateMax: new win.Date(2024, 5, 25).getTime(),
        selectedDates: [new win.Date(2024, 5, 20), new win.Date(2024, 5, 21).getTime()],
        selectionDatesMode: 'multiple',
      });
      win.instance.init();
    });
    selected(['2024-06-20', '2024-06-21']);
    day('2024-06-09').should('be.disabled');
  });

  it('combines disabled weekdays, past dates and explicit enabled exceptions', () => {
    mount({ disableDatesPast: true, disableWeekdays: [0, 6], enableDates: ['2024-06-22'] });
    day('2024-06-18').should('be.disabled');
    day('2024-06-23').should('be.disabled');
    day('2024-06-22').should('not.be.disabled').click();
    selected(['2024-06-22']);
  });

  it('can prevent deselection with a boolean or callback', () => {
    mount({ enableDateToggle: false });
    day('2024-06-20').click().click();
    selected(['2024-06-20']);
    const toggle = cy.stub().as('toggle').returns(false);
    use((instance) => instance.set({ enableDateToggle: toggle, selectedDates: ['2024-06-21'] }));
    day('2024-06-21').click();
    selected(['2024-06-21']);
    cy.get('@toggle').should('have.been.called');
    cy.then(() => toggle.returns(true));
    day('2024-06-21').click();
    selected([]);
  });

  it('can keep the visible month when an outside date is selected', () => {
    mount({ enableMonthChangeOnDayClick: false });
    cy.get('[data-vc-date="2024-05-31"] [data-vc-date-btn]').click();
    cy.get('[data-vc="month"]').should('have.attr', 'data-vc-month', '5');
    use((instance) => expect(instance.context.selectedDates).to.deep.equal(['2024-05-31']));
  });

  it('switches to the outside date month by default', () => {
    mount();
    cy.get('[data-vc-date="2024-05-31"] [data-vc-date-btn]').click();
    cy.get('[data-vc="month"]').should('have.attr', 'data-vc-month', '4');
    selected(['2024-05-31']);
  });

  it('preserves inclusive range endpoints when selected backwards', () => {
    mount({ selectionDatesMode: 'multiple-ranged' });
    day('2024-06-23').click();
    day('2024-06-20').click();
    selected(['2024-06-20', '2024-06-21', '2024-06-22', '2024-06-23']);
    day('2024-06-20').parent().should('have.attr', 'data-vc-date-selected', 'first');
    day('2024-06-23').parent().should('have.attr', 'data-vc-date-selected', 'last');
  });

  it('returns every enabled date when range edge compression is disabled', () => {
    mount({ selectionDatesMode: 'multiple-ranged', enableEdgeDatesOnly: false, disableDates: ['2024-06-21'] });
    day('2024-06-20').click();
    day('2024-06-23').click();
    selected(['2024-06-20', '2024-06-22', '2024-06-23']);
    use((instance) => expect(instance.context.selectedDates).to.deep.equal(['2024-06-20', '2024-06-22', '2024-06-23']));
  });

  it('allows arrow navigation while month/year title pickers are locked', () => {
    mount({ selectionMonthsMode: 'only-arrows', selectionYearsMode: 'only-arrows' });
    cy.get('[data-vc="month"]').should('be.disabled');
    cy.get('[data-vc="year"]').should('be.disabled');
    arrow('next').click();
    day('2024-07-20').click();
    selected(['2024-07-20']);
    arrow('prev').click();
    cy.get('[data-vc="month"]').should('have.attr', 'data-vc-month', '5');
  });

  it('keeps navigation within the selected year when year selection is disabled', () => {
    mount({ selectionYearsMode: false, selectedYear: 2024, selectedMonth: 11 });
    arrow('next').should('not.be.visible');
    cy.get('[data-vc-date="2025-01-01"] [data-vc-date-btn]').should('be.disabled');
    arrow('prev').click();
    day('2024-11-20').click();
    selected(['2024-11-20']);
  });
});

describe('Input lifecycle and positioning', () => {
  it('shows and hides idempotently, calls callbacks once and restores input on destroy', () => {
    const show = cy.stub().as('show');
    const hide = cy.stub().as('hide');
    mount({ inputMode: true, onShow: show, onHide: hide }, true);
    use((instance) => instance.show());
    cy.get('[data-vc-input]').should('be.visible');
    use((instance) => instance.show());
    cy.get('@show').should('have.been.calledOnce');
    use((instance) => {
      instance.hide();
      instance.hide();
    });
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-calendar-hidden');
    cy.get('@hide').should('have.been.calledOnce');
    use((instance) => instance.destroy());
    cy.get('[data-vc-input]').should('not.exist');
    cy.get('#input').should('not.have.attr', 'aria-haspopup');
    cy.get('#input').click();
    cy.get('[data-vc-input]').should('not.exist');
  });

  it('can disable opening on focus while retaining click opening', () => {
    mount({ inputMode: true, openOnFocus: false }, true);
    cy.get('#input').focus();
    cy.get('[data-vc-input]').should('not.exist');
    cy.get('#input').click();
    cy.get('[data-vc-input]').should('be.visible');
    cy.get('#outside').click();
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-calendar-hidden');
  });

  it('honors openOnFocus callbacks and closes on Escape', () => {
    const canOpen = cy.stub().as('focus').returns(false);
    mount({ inputMode: true, openOnFocus: canOpen }, true);
    cy.get('#input').focus();
    cy.get('[data-vc-input]').should('not.exist');
    cy.then(() => canOpen.returns(true));
    cy.get('#outside').focus();
    cy.get('#input').focus();
    cy.get('[data-vc-input]').should('be.visible');
    day('2024-06-20').focus().type('{esc}');
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-calendar-hidden');
    cy.focused().should('have.id', 'input');
  });

  it('fits an auto-positioned popup in a narrow viewport near the lower right corner', () => {
    cy.viewport(390, 700);
    cy.get('#input').invoke('attr', 'style', 'position:fixed;right:8px;bottom:8px;width:120px');
    mount({ inputMode: true, positionToInput: 'auto' }, true);
    cy.get('#input').click();
    cy.get('[data-vc-input]')
      .should('be.visible')
      .should(($popup) => {
        const bounds = $popup[0].getBoundingClientRect();
        expect(bounds.left).to.be.at.least(0);
        expect(bounds.right).to.be.at.most(390);
        expect(bounds.bottom).to.be.at.most(700);
      });
  });

  it('applies a set() made before the input calendar is first opened', () => {
    mount({ inputMode: true }, true);
    use((instance) => instance.set({ selectedDates: ['2025-02-14'], enableJumpToSelectedDate: true }));
    cy.get('#input').click();
    selected(['2025-02-14']);
    cy.get('[data-vc="year"]').should('have.attr', 'data-vc-year', '2025');
  });
});

describe('Time controls and validation', () => {
  for (const [minimum, hours, keeping] of [
    [0, '12', 'AM'],
    [12, '12', 'PM'],
    [13, '01', 'PM'],
    [23, '11', 'PM'],
  ] as const) {
    it(`initializes 12-hour time from timeMinHour=${minimum} as ${hours}:00 ${keeping}`, () => {
      mount({ selectionTimeMode: 12, timeMinHour: minimum });
      hour().should('have.value', hours);
      cy.get('[data-vc-time="keeping"]').should('have.text', keeping);
      range('hour').should(($range) => expect(($range[0] as HTMLInputElement).valueAsNumber).to.equal(minimum));
      use((instance) => expect(instance.context.selectedTime).to.equal(`${hours}:00 ${keeping}`));
    });
  }

  it('synchronizes 24-hour inputs and ranges and reports invalid edits', () => {
    const change = cy.stub().as('time');
    mount({ selectionTimeMode: 24, selectedTime: '09:15', timeMinHour: 6, timeMaxHour: 21, timeMinMinute: 10, timeMaxMinute: 40, onChangeTime: change });
    hour().clear().type('22').blur().should('have.value', '09');
    use((instance) => expect(instance.context.selectedTime).to.equal('09:15'));
    cy.get('@time').should('have.been.calledWithMatch', Cypress.sinon.match.any, Cypress.sinon.match.any, true);
    minute().clear().type('40').blur();
    range('minute').should('have.value', '40');
    use((instance) => expect(instance.context.selectedTime).to.equal('09:40'));
    cy.get('@time').should('have.been.calledWithMatch', Cypress.sinon.match.any, Cypress.sinon.match.any, false);
    minute().clear().type('xx').blur().should('have.value', '40');
  });

  it('converts midnight/noon and 23:00 correctly with 12-hour ranges', () => {
    mount({ selectionTimeMode: 12, selectedTime: '01:00 AM' });
    for (const [value, text, keeping] of [
      ['0', '12', 'AM'],
      ['12', '12', 'PM'],
      ['23', '11', 'PM'],
    ]) {
      range('hour').invoke('val', value).trigger('input');
      hour().should('have.value', text);
      cy.get('[data-vc-time="keeping"]').should('have.text', keeping);
      use((instance) => expect(instance.context.selectedTime).to.equal(`${text}:00 ${keeping}`));
    }
  });

  it('rejects an AM/PM change outside the allowed hours', () => {
    const change = cy.stub().as('time');
    mount({ selectionTimeMode: 12, selectedTime: '09:30 AM', timeMinHour: 6, timeMaxHour: 18, onChangeTime: change });
    cy.get('[data-vc-time="keeping"]').click().should('have.text', 'AM');
    use((instance) => expect(instance.context.selectedTime).to.equal('09:30 AM'));
    range('hour').should(($range) => expect(($range[0] as HTMLInputElement).valueAsNumber).to.equal(9));
    cy.get('@time').should('have.been.calledWithMatch', Cypress.sinon.match.any, Cypress.sinon.match.any, true);
  });

  it('can enable and remove the time picker via set()', () => {
    mount();
    cy.get('[data-vc="time"]').should('not.exist');
    use((instance) => instance.set({ selectionTimeMode: 24, selectedTime: '23:59' }));
    hour().should('have.value', '23');
    minute().should('have.value', '59');
    use((instance) => instance.set({ selectionTimeMode: false }));
    cy.get('[data-vc="time"]').should('not.exist');
    day('2024-06-20').click();
    selected(['2024-06-20']);
  });
});

describe('Customization and accessibility', () => {
  it('updates a detected theme attribute and stops observing after destroy', () => {
    cy.get('html').invoke('attr', 'data-theme', 'light');
    mount();
    calendar().should('have.attr', 'data-vc-theme', 'light');
    cy.get('html').invoke('attr', 'data-theme', 'dark');
    calendar().should('have.attr', 'data-vc-theme', 'dark');
    use((instance) => instance.destroy());
    cy.get('html').invoke('attr', 'data-theme', 'light');
    cy.get('#calendar').should('not.have.attr', 'data-vc-theme');
  });

  it('honors CSS custom properties in the published stylesheet', () => {
    mount({ selectedTheme: 'light' });
    calendar().invoke('attr', 'style', '--vc-bg:rgb(1, 2, 3);--vc-color:rgb(4, 5, 6)');
    calendar().should('have.css', 'background-color', 'rgb(1, 2, 3)').and('have.css', 'color', 'rgb(4, 5, 6)');
  });

  it('passes generated layouts and popup HTML through the supplied sanitizer', () => {
    const sanitizer = cy.spy((html: string) => html.replace(/unsafe-token/g, 'sanitized-token')).as('sanitizer');
    mount({ sanitizerHTML: sanitizer, popups: { '2024-06-20': { html: '<b>unsafe-token</b>' } } });
    cy.get('[data-vc-date-popup]').should('have.html', '<b>sanitized-token</b>');
    cy.get('@sanitizer').should('have.been.called');
    day('2024-06-20').click();
    selected(['2024-06-20']);
  });

  it('calls month/year creation hooks and preserves their output', () => {
    mount({
      onCreateMonthEls: (_self, element) => element.setAttribute('data-custom-month', ''),
      onCreateYearEls: (_self, element) => element.setAttribute('data-custom-year', ''),
    });
    cy.get('[data-vc="month"]').click();
    cy.get('[data-custom-month]').should('have.length', 12);
    cy.get('[data-vc-months-month="5"]').click();
    cy.get('[data-vc="year"]').click();
    cy.get('[data-custom-year]').should('have.length', 15);
  });

  it('opens pickers from the title callback and returns keyboard focus after selection', () => {
    const title = cy.stub().as('title');
    mount({ onClickTitle: title });
    cy.get('[data-vc="month"]').click();
    cy.get('@title').should('have.been.calledOnce');
    cy.focused().should('have.attr', 'data-vc-months-month');
    cy.get('[data-vc-months-month="7"]').click();
    cy.focused().should('have.attr', 'data-vc', 'month');
  });

  it('moves keyboard focus past disabled days and selects the focused date', () => {
    mount({ disableDates: ['2024-06-21'], selectedDates: ['2024-06-20'] });
    day('2024-06-20').focus().trigger('keydown', { key: 'ArrowRight' });
    cy.focused().parent().should('have.attr', 'data-vc-date', '2024-06-22');
    // Native Enter activation is exercised by tests/browser/native.mjs; Cypress
    // does not support cy.press() in WebKit.
    cy.focused().click();
    selected(['2024-06-22']);
    cy.get('[data-vc="dates"] [tabindex="0"]').should('have.length', 1);
  });
});
