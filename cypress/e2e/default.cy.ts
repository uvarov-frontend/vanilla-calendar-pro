describe('Init default calendar', () => {
  it('Check availability of calendar', () => {
    cy.visit('/');
    cy.get('#calendar').children();
  });
  it('Check months', () => {
    cy.visit('/');
    cy.get('#calendar').find('.vc-month').should('have.attr', 'data-vc-month');
    cy.get('#calendar').find('.vc-month').click();
    cy.get('#calendar')
      .find('.vc-months')
      .children('.vc-months__month')
      .then(($month) => $month[1].click());
    cy.get('#calendar').find('.vc-month').should('have.attr', 'data-vc-month', '1');
  });
  it('Check years', () => {
    cy.visit('/');
    cy.get('#calendar').find('.vc-year').should('have.attr', 'data-vc-year');
    cy.get('#calendar').find('.vc-year').click();
    cy.get('#calendar').find('.vc-years').children('.vc-years__year[data-vc-years-year="2022"]').click();
    cy.get('#calendar').find('.vc-year').should('have.attr', 'data-vc-year', '2022');
  });
  it('Check arrows', () => {
    cy.visit('/');
    cy.get('#calendar').find('.vc-arrow.vc-arrow_next').click();
    cy.get('#calendar').find('.vc-month').should('have.attr', 'data-vc-month', '4');
    cy.get('#calendar').find('.vc-arrow.vc-arrow_next').click();
    cy.get('#calendar').find('.vc-month').should('have.attr', 'data-vc-month', '5');
    for (let n = 0; n < 6; n++) {
      cy.get('#calendar').find('.vc-arrow.vc-arrow_prev').click();
    }
    cy.get('#calendar').find('.vc-month').should('have.attr', 'data-vc-month', '11');
    cy.get('#calendar').find('.vc-year').should('have.attr', 'data-vc-year', '2022');
  });
  it('Check days', () => {
    cy.visit('/');
    cy.get('#calendar')
      .find('.vc-date__btn')
      .then(($day) => {
        expect($day).to.have.length(35);
        $day[10].click();
      });
    cy.get('#calendar').find('.vc-date[data-vc-date-selected]').should('have.attr', 'data-vc-date', '2023-04-06');
  });
});
