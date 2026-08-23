const visit = () => cy.visit('/pages/gestures/');

const visitWithoutAnimationsApi = () =>
  cy.visit('/pages/gestures/', {
    onBeforeLoad(win) {
      Object.defineProperty(win.Element.prototype, 'animate', { configurable: true, value: undefined });
    },
  });

const monthOf = (id: string) => cy.get(`${id} [data-vc="month"]`).first().invoke('attr', 'data-vc-month');

const pointer = { pointerId: 1, isPrimary: true, button: 0, eventConstructor: 'PointerEvent', force: true } as const;

const dragSurface = (id: string, dx: number) => {
  cy.get(`${id} [data-vc="content"]`)
    .first()
    .then(($el) => {
      const box = $el[0].getBoundingClientRect();
      const x = Math.round(box.left + box.width / 2);
      const y = Math.round(box.top + box.height / 2);

      cy.wrap($el).trigger('pointerdown', { ...pointer, clientX: x, clientY: y });
      cy.wrap($el).trigger('pointermove', { ...pointer, clientX: x + Math.sign(dx) * 12, clientY: y });
      cy.wrap($el).trigger('pointermove', { ...pointer, clientX: x + dx, clientY: y });
      cy.get(id).trigger('pointerup', { ...pointer, clientX: x + dx, clientY: y });
    });
};

const dragControl = (id: string, dy: number) => {
  cy.get(`${id} [data-vc="collapse"]`).then(($el) => {
    const box = $el[0].getBoundingClientRect();
    const x = Math.round(box.left + box.width / 2);
    const y = Math.round(box.top + box.height / 2);

    cy.wrap($el).trigger('pointerdown', { ...pointer, clientX: x, clientY: y });
    cy.get(id).trigger('pointermove', { ...pointer, clientX: x, clientY: y + Math.sign(dy) * 12 });
    cy.get(id).trigger('pointermove', { ...pointer, clientX: x, clientY: y + dy });
    cy.get(id).trigger('pointerup', { ...pointer, clientX: x, clientY: y + dy });
  });
};

describe('Gesture option combinations', () => {
  it('collapses without enableSwipe', () => {
    visit();
    cy.get('#calendar-collapse-only [data-vc="collapse"]').click();
    cy.get('#calendar-collapse-only').should('have.attr', 'data-vc-type', 'week');

    dragSurface('#calendar-collapse-only', -300);
    cy.get('#calendar-collapse-only [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-collapse-only [data-vc-date]').should('have.length', 7);
    monthOf('#calendar-collapse-only').should('equal', '3');
  });

  it('swipes without enableCollapse', () => {
    visit();
    cy.get('#calendar-multiple [data-vc="collapse"]').should('not.exist');
    dragSurface('#calendar-multiple', -300);
    cy.get('#calendar-multiple [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-multiple').should('equal', '4');
  });

  it('runs both gestures with no animation option at all', () => {
    visit();
    cy.get('#calendar-plain [data-vc-dates="row"]').should('have.length', 5);

    cy.get('#calendar-plain [data-vc="collapse"]').click();
    cy.get('#calendar-plain').should('have.attr', 'data-vc-type', 'week');
    cy.get('#calendar-plain [data-vc-collapsing]').should('not.exist');

    dragControl('#calendar-plain', 100);
    cy.get('#calendar-plain').should('have.attr', 'data-vc-type', 'default');
    cy.get('#calendar-plain [data-vc-dates="row"]').should('have.length', 5);

    dragSurface('#calendar-plain', -300);
    cy.get('#calendar-plain [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-plain [data-vc-clip]').should('not.exist');
    monthOf('#calendar-plain').should('equal', '4');
  });

  it('falls back when the Web Animations API is unavailable', () => {
    visitWithoutAnimationsApi();

    cy.get('#calendar-plain [data-vc="collapse"]').click();
    cy.get('#calendar-plain').should('have.attr', 'data-vc-type', 'week');

    dragSurface('#calendar-plain', -300);
    cy.get('#calendar-plain [data-vc-date]')
      .then(($dates) => Cypress._.map($dates, (date: HTMLElement) => date.dataset.vcDate))
      .should('deep.equal', ['2023-04-24', '2023-04-25', '2023-04-26', '2023-04-27', '2023-04-28', '2023-04-29', '2023-04-30']);
  });

  it('supports both gestures in inputMode', () => {
    visit();
    cy.get('#calendar-input-gestures').click();
    cy.get('#calendar-input-popup').should('be.visible');

    dragControl('#calendar-input-popup', -100);
    cy.get('#calendar-input-popup').should('have.attr', 'data-vc-type', 'week');

    dragSurface('#calendar-input-popup', -300);
    monthOf('#calendar-input-popup').should('equal', '3');
    cy.get('#calendar-input-popup [data-vc-date]')
      .then(($dates) => Cypress._.map($dates, (date: HTMLElement) => date.dataset.vcDate))
      .should('deep.equal', ['2023-04-24', '2023-04-25', '2023-04-26', '2023-04-27', '2023-04-28', '2023-04-29', '2023-04-30']);
  });

  it('supports enabling gestures through set()', () => {
    visit();
    cy.get('#calendar-static').should('not.have.attr', 'data-vc-swipe');
    cy.get('#btn-enable-gestures').click();
    cy.get('#calendar-static').should('have.attr', 'data-vc-swipe');
    cy.get('#calendar-static [data-vc="collapse"]').should('exist');

    dragSurface('#calendar-static', -300);
    monthOf('#calendar-static').should('equal', '4');
  });

  it('leaves a calendar that asked for neither gesture untouched', () => {
    visit();
    cy.get('#calendar-static [data-vc="collapse"]').should('not.exist');
    cy.get('#calendar-static').should('not.have.attr', 'data-vc-swipe');
    dragSurface('#calendar-static', -300);
    cy.get('#calendar-static [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-static').should('equal', '3');
  });

  it('claims the touch axis only where the swipe is on', () => {
    visit();
    cy.get('#calendar-plain').should('have.attr', 'data-vc-swipe');
    cy.get('#calendar-collapse-only').should('not.have.attr', 'data-vc-swipe');
    cy.get('#calendar-collapse-only [data-vc="content"]').should('not.have.css', 'touch-action', 'pan-y');
    cy.get('#calendar-plain [data-vc="content"]').should('have.css', 'touch-action', 'pan-y');
  });

  it('gives a finger a longer leash than a mouse before taking the axis', () => {
    visit();
    const nudge = (pointerType: string, by: number) =>
      cy
        .get('#calendar-plain [data-vc="content"]')
        .first()
        .then(($el) => {
          const box = $el[0].getBoundingClientRect();
          const x = Math.round(box.left + box.width / 2);
          const y = Math.round(box.top + box.height / 2);
          cy.wrap($el).trigger('pointerdown', { ...pointer, pointerType, clientX: x, clientY: y });
          cy.wrap($el).trigger('pointermove', { ...pointer, pointerType, clientX: x + by, clientY: y });
        });

    nudge('mouse', -6);
    cy.get('#calendar-plain [data-vc-ghost]').should('exist');
    cy.get('#calendar-plain').trigger('pointercancel', { ...pointer, pointerType: 'mouse' });
    cy.get('#calendar-plain [data-vc-ghost]').should('not.exist');

    nudge('touch', -6);
    cy.get('#calendar-plain [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-plain').trigger('pointercancel', { ...pointer, pointerType: 'touch' });
  });

  it('shows a grabbing cursor while a mouse drag is active', () => {
    visit();
    cy.get('#calendar-plain [data-vc="content"]')
      .first()
      .then(($el) => {
        const box = $el[0].getBoundingClientRect();
        const x = Math.round(box.left + box.width / 2);
        const y = Math.round(box.top + box.height / 2);
        cy.wrap($el).trigger('pointerdown', { ...pointer, pointerType: 'mouse', clientX: x, clientY: y });
        cy.wrap($el).trigger('pointermove', { ...pointer, pointerType: 'mouse', clientX: x - 6, clientY: y });
      });

    cy.get('#calendar-plain').should('have.attr', 'data-vc-dragging');
    cy.get('#calendar-plain').should('have.css', 'cursor', 'grabbing');
    cy.get('#calendar-plain [data-vc-date-btn]').first().should('have.css', 'cursor', 'grabbing');

    cy.get('#calendar-plain').trigger('pointercancel', { ...pointer, pointerType: 'mouse' });
    cy.get('#calendar-plain').should('not.have.attr', 'data-vc-dragging');
  });

  it('does not smear a hover range across a mouse drag', () => {
    visit();
    cy.get('#calendar-range [data-vc-date="2023-04-05"] [data-vc-date-btn]').click();
    cy.get('#calendar-range [data-vc-date-selected]').should('have.length', 1);

    cy.get('#calendar-range [data-vc="content"]')
      .first()
      .then(($el) => {
        const box = $el[0].getBoundingClientRect();
        const x = Math.round(box.left + box.width / 2);
        const y = Math.round(box.top + box.height / 2);
        cy.wrap($el).trigger('pointerdown', { ...pointer, pointerType: 'mouse', clientX: x, clientY: y });
        cy.wrap($el).trigger('pointermove', { ...pointer, pointerType: 'mouse', clientX: x - 12, clientY: y });
        cy.wrap($el).trigger('pointermove', { ...pointer, pointerType: 'mouse', clientX: x - 120, clientY: y });
        cy.wrap($el).trigger('mousemove', { clientX: x - 120, clientY: y, force: true });
      });

    cy.get('#calendar-range [data-vc-date-hover]').should('not.exist');
    cy.get('#calendar-range').trigger('pointercancel', { ...pointer, pointerType: 'mouse' });
    cy.get('#calendar-range [data-vc-ghost]').should('not.exist');
  });

  it('makes no part of the calendar selectable, bar the fields meant to be edited', () => {
    visit();
    cy.get('#calendar-static').should('have.css', 'user-select', 'none');

    ['[data-vc="header"]', '[data-vc="month"]', '[data-vc-week-day]', '[data-vc-date]', '[data-vc-date-btn]'].forEach((selector) =>
      cy.get(`#calendar-static ${selector}`).first().should('have.css', 'user-select', 'none'),
    );
  });

  it('leaves the time fields selectable', () => {
    cy.visit('/');
    cy.get('[data-vc="calendar"]').should('have.css', 'user-select', 'none');
    cy.get('[data-vc-time-input="hour"] input').should('have.css', 'user-select', 'text');
    cy.get('[data-vc-time-input="minute"] input').should('have.css', 'user-select', 'text');
  });

  it('refuses only the one pairing that cannot work', () => {
    visit();
    cy.get('#btn-invalid-collapse').click();
    cy.get('#log').should('contain.text', 'init() threw').and('contain.text', 'only supported by the «default» and «week»');
  });
});

export {};
