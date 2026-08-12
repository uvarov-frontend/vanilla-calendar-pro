describe('disableDatesGaps on initial load (multiple-ranged)', () => {
  it('clamps displayDateMin/Max around a pre-selected selectedDates entry right after init', () => {
    cy.visit('/pages/disable-dates-gaps/');
    // enableDates: '2022-01-10:2022-01-15' and '2022-01-24:2022-01-29', selectedDates: ['2022-01-12']
    // the gap (2022-01-16..23) should already clamp the selectable range without any click
    cy.get('[data-vc-date="2022-01-15"]').should('not.have.attr', 'data-vc-date-disabled');
    cy.get('[data-vc-date="2022-01-16"]').should('have.attr', 'data-vc-date-disabled');
    cy.get('[data-vc-date="2022-01-29"]').should('have.attr', 'data-vc-date-disabled');
  });

  it('a forced click past the gap does not extend the selected range', () => {
    cy.visit('/pages/disable-dates-gaps/');
    cy.get('[data-vc-date="2022-01-29"]').click({ force: true });
    cy.get('[data-vc-date-selected]').should('have.length', 1).and('have.attr', 'data-vc-date', '2022-01-12');
  });

  it('selecting a date within the still-open range works normally', () => {
    cy.visit('/pages/disable-dates-gaps/');
    cy.get('[data-vc-date="2022-01-14"]').click();
    cy.get('[data-vc-date-selected]').should('have.length', 3);
    cy.get('[data-vc-date="2022-01-12"]').should('have.attr', 'data-vc-date-selected', 'first');
    cy.get('[data-vc-date="2022-01-14"]').should('have.attr', 'data-vc-date-selected', 'last');
  });
});
