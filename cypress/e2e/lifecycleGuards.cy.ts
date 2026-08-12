describe('init()/destroy() lifecycle guards', () => {
  it('calling init() twice on the same instance throws, and does not corrupt the DOM', () => {
    cy.visit('/pages/lifecycle/');
    cy.get('#btn-init').click();
    cy.get('#log').should('contain.text', 'init() OK');

    cy.get('#btn-init').click();
    cy.get('#log').should('contain.text', 'init() threw').and('contain.text', 'already been initialized');

    cy.get('#calendar').should('exist').and('have.attr', 'data-vc', 'calendar');
  });

  it('calling destroy() twice on the same instance throws, without removing the element', () => {
    cy.visit('/pages/lifecycle/');
    cy.get('#btn-init').click();
    cy.get('#btn-destroy').click();
    cy.get('#log').should('contain.text', 'destroy() OK');

    cy.get('#btn-destroy').click();
    cy.get('#log').should('contain.text', 'destroy() threw').and('contain.text', 'already been destroyed');

    cy.get('#calendar').should('exist');
  });
});
