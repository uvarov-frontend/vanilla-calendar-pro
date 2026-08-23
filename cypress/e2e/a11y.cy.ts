// color-contrast and landmark/region are excluded on purpose: they're about the demo page's
// own styling/structure, not the calendar component's ARIA markup, which is what this checks.
const axeOptions = {
  rules: {
    'color-contrast': { enabled: false },
    'landmark-one-main': { enabled: false },
    region: { enabled: false },
  },
};

describe('Accessibility (axe-core)', () => {
  it('default calendar view has no ARIA violations', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y(undefined, axeOptions);
  });

  it('month picker view has no ARIA violations', () => {
    cy.visit('/');
    cy.get('.vc-month').click();
    cy.injectAxe();
    cy.checkA11y(undefined, axeOptions);
  });

  it('year picker view has no ARIA violations', () => {
    cy.visit('/');
    cy.get('.vc-year').click();
    cy.injectAxe();
    cy.checkA11y(undefined, axeOptions);
  });

  it('type: multiple calendar view has no ARIA violations', () => {
    cy.visit('/pages/multiple/index.html');
    cy.injectAxe();
    cy.checkA11y(undefined, axeOptions);
  });

  it('type: week calendar view has no ARIA violations', () => {
    cy.visit('/pages/week/');
    cy.injectAxe();
    cy.checkA11y('#calendar-week', axeOptions);
  });

  it('collapsed calendar view has no ARIA violations', () => {
    cy.visit('/pages/gestures/');
    cy.get('#calendar-bounded [data-vc="collapse"]').click();
    cy.get('#calendar-bounded').should('have.attr', 'data-vc-type', 'week');
    cy.injectAxe();
    cy.checkA11y('#calendar-bounded', axeOptions);
  });

  it('inputMode popup has no ARIA violations', () => {
    cy.visit('/pages/input/');
    cy.get('#calendar-input').click();
    cy.injectAxe();
    cy.checkA11y(undefined, axeOptions);
  });
});
