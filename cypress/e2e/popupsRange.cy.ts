describe('popups with a date-range key', () => {
  it('applies the same popup to every day in the range', () => {
    cy.visit('/pages/popups-range/');
    const days = ['10', '11', '12', '13', '14', '15', '16', '17'];
    days.forEach((d) => {
      cy.get(`[data-vc-date="2026-02-${d}"] [data-vc-date-popup]`).should('exist').and('contain.text', "Fred's vacation");
      cy.get(`[data-vc-date="2026-02-${d}"] [data-vc-date-btn]`).should('have.class', 'bg-orange');
    });
  });

  it('does not apply the popup outside the range', () => {
    cy.visit('/pages/popups-range/');
    cy.get('[data-vc-date="2026-02-09"] [data-vc-date-popup]').should('not.exist');
    cy.get('[data-vc-date="2026-02-18"] [data-vc-date-popup]').should('not.exist');
  });
});
