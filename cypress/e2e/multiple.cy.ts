describe('Init multiple calendar', () => {
  it('Check availability of calendar', () => {
    cy.visit('/pages/multiple/index.html');
    cy.get('#calendar').children();
  });
  it('Check months', () => {
    cy.visit('/pages/multiple/index.html');
    cy.get('#calendar')
      .find('.vc-month')
      .then(($month) => {
        expect($month).to.have.length(2);
      });
  });
  it('Check years', () => {
    cy.visit('/pages/multiple/index.html');
    cy.get('#calendar')
      .find('.vc-year')
      .then(($year) => {
        expect($year).to.have.length(2);
      });
  });
  it('Check arrows', () => {
    cy.visit('/pages/multiple/index.html');
    cy.get('#calendar').find('.vc-arrow.vc-arrow_next').click();
    cy.get('#calendar').find('.vc-month:first').should('have.attr', 'data-vc-month', '4');
    cy.get('#calendar').find('.vc-month:last').should('have.attr', 'data-vc-month', '5');
    for (let n = 0; n < 5; n++) {
      cy.get('#calendar').find('.vc-arrow.vc-arrow_prev').click();
    }
    cy.get('#calendar').find('.vc-month:first').should('have.attr', 'data-vc-month', '11');
    cy.get('#calendar').find('.vc-month:last').should('have.attr', 'data-vc-month', '0');
    cy.get('#calendar').find('.vc-year:first').should('have.attr', 'data-vc-year', '2022');
    cy.get('#calendar').find('.vc-year:last').should('have.attr', 'data-vc-year', '2023');
  });
  it('Check days', () => {
    cy.visit('/pages/multiple/index.html');
    cy.get('#calendar')
      .find('.vc-date__btn')
      .then(($day) => {
        expect($day).to.have.length(70);
        $day[30].click();
      });
    cy.get('#calendar')
      .find('.vc-date__btn')
      .then(($day) => $day[45].click());
    cy.get('#calendar')
      .find('.vc-date[data-vc-date-selected]')
      .then(($day) => expect($day).to.have.length(16));
    cy.get('#calendar')
      .find('.vc-date__btn')
      .then(($day) => $day[45].click());
    cy.get('#calendar')
      .find('.vc-date__btn')
      .then(($day) => $day[45].click());
    cy.get('#calendar')
      .find('.vc-date')
      .then(($day) => expect($day).not.to.be.attr('data-vc-date-selected'));
  });
});
