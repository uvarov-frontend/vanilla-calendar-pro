describe('Shadow DOM support', () => {
  it('renders the popup inside the shadow root, not in document.body', () => {
    cy.visit('/pages/shadow-dom/');
    cy.get('#widget-1').shadow().find('[data-vc-shadow-input]').click();
    cy.get('#widget-1').shadow().find('[data-vc="calendar"]').should('exist').and('not.have.attr', 'data-vc-calendar-hidden');
    cy.get('body').find('> [data-vc-input]').should('not.exist');
  });

  it('clicking a date inside the shadow-DOM calendar does not close it', () => {
    cy.visit('/pages/shadow-dom/');
    cy.get('#widget-1').shadow().find('[data-vc-shadow-input]').click();
    cy.get('#widget-1').shadow().find('[data-vc-date-btn]').first().click();
    cy.get('#widget-1').shadow().find('[data-vc="calendar"]').should('not.have.attr', 'data-vc-calendar-hidden');
  });

  it('clicking outside (light DOM) closes the shadow-DOM calendar', () => {
    cy.visit('/pages/shadow-dom/');
    cy.get('#widget-1').shadow().find('[data-vc-shadow-input]').click();
    cy.get('#light-dom-outside').click({ force: true });
    cy.get('#widget-1').shadow().find('[data-vc="calendar"]').should('have.attr', 'data-vc-calendar-hidden');
  });

  it('two independent shadow-DOM instances do not interfere with each other', () => {
    cy.visit('/pages/shadow-dom/');
    cy.get('#widget-1').shadow().find('[data-vc-shadow-input]').click();
    cy.get('#widget-1').shadow().find('[data-vc="calendar"]').should('not.have.attr', 'data-vc-calendar-hidden');
    cy.get('#widget-2').shadow().find('[data-vc="calendar"]').should('not.exist');
  });

  it('destroy() removes the calendar behavior but keeps the input in the shadow DOM', () => {
    cy.visit('/pages/shadow-dom/');
    cy.get('#widget-1').shadow().find('[data-vc-shadow-destroy]').click();
    cy.get('#widget-1').shadow().find('[data-vc-shadow-input]').should('exist');
    cy.get('#widget-1').shadow().find('[data-vc="calendar"]').should('not.exist');
  });

  it('clicking Destroy twice in a row does not remove the input (regression: destroy() must be idempotent-safe)', () => {
    cy.visit('/pages/shadow-dom/');
    cy.get('#widget-1').shadow().find('[data-vc-shadow-destroy]').click();
    // the demo clears its own calendar reference after destroy, so a second click is a no-op;
    // this guards the UI-level behavior, while the library itself also rejects a raw double-call
    cy.get('#widget-1').shadow().find('[data-vc-shadow-destroy]').click();
    cy.get('#widget-1').shadow().find('[data-vc-shadow-input]').should('exist');
  });

  it('Init after Destroy creates a fresh, working calendar instance', () => {
    cy.visit('/pages/shadow-dom/');
    cy.get('#widget-1').shadow().find('[data-vc-shadow-destroy]').click();
    cy.get('#widget-1').shadow().find('[data-vc-shadow-init]').click();
    cy.get('#widget-1').shadow().find('[data-vc-shadow-input]').click();
    cy.get('#widget-1').shadow().find('[data-vc="calendar"]').should('exist').and('not.have.attr', 'data-vc-calendar-hidden');
  });

  it('a plain (non-inputMode) calendar renders directly inside the shadow root and dates are clickable', () => {
    cy.visit('/pages/shadow-dom/');
    cy.get('#widget-3').shadow().find('[data-vc="calendar"]').should('exist');
    cy.get('#widget-3').shadow().find('[data-vc-date-btn]').first().click();
    cy.get('#widget-3').shadow().find('[data-vc-date-selected]').should('exist');
  });
});
