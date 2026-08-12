const getRowWeekNumbers = (containerSelector: string) =>
  cy
    .get(containerSelector)
    .find('[data-vc-week-number]')
    .then(($weeks) => [...$weeks].map((el) => Number(el.dataset.vcWeekNumber)));

describe('Week numbers', () => {
  it('December 2026 ends on week 53 (2026 is a 53-ISO-week year)', () => {
    cy.visit('/pages/week-numbers/');
    getRowWeekNumbers('#calendar-2026').should('deep.equal', [49, 50, 51, 52, 53]);
    cy.get('#calendar-2026').find('[data-vc-week-number="53"]').should('have.attr', 'data-vc-week-year', '2026');
  });

  it('December 2025 rolls its last row into week 1 of 2026 (2025 is a 52-ISO-week year)', () => {
    cy.visit('/pages/week-numbers/');
    getRowWeekNumbers('#calendar-2025').should('deep.equal', [49, 50, 51, 52, 1]);
    cy.get('#calendar-2025').find('[data-vc-week-number="1"]').should('have.attr', 'data-vc-week-year', '2026');
  });

  it('firstWeekday=0 (Sunday-start weeks) still numbers rows sequentially with no gaps or duplicates', () => {
    cy.visit('/pages/week-numbers/');
    getRowWeekNumbers('#calendar-sunday-start').should('deep.equal', [22, 23, 24, 25, 26]);
  });
});
