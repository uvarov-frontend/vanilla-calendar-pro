describe('Init default calendar', () => {
	it('Check availability of calendar', () => {
		cy.visit('/');
		cy.get('#calendar').children();
	});
	it('Check months', () => {
		cy.visit('/');
		cy.get('#calendar').find('.vanilla-calendar-month').should('have.attr', 'data-calendar-selected-month');
		cy.get('#calendar').find('.vanilla-calendar-month').click();
		cy.get('#calendar').find('.vanilla-calendar-months').children('.vanilla-calendar-months__month').then(($month) => $month[1].click());
		cy.get('#calendar').find('.vanilla-calendar-month').should('have.attr', 'data-calendar-selected-month', '1');
	});
	it('Check years', () => {
		cy.visit('/');
		cy.get('#calendar').find('.vanilla-calendar-year').should('have.attr', 'data-calendar-selected-year');
		cy.get('#calendar').find('.vanilla-calendar-year').click();
		cy.get('#calendar').find('.vanilla-calendar-years').children('.vanilla-calendar-years__year[data-calendar-year="2022"]').click();
		cy.get('#calendar').find('.vanilla-calendar-year').should('have.attr', 'data-calendar-selected-year', '2022');
	});
	it('Check arrows', () => {
		cy.visit('/');
		cy.get('#calendar').find('.vanilla-calendar-arrow.vanilla-calendar-arrow_next').click();
		cy.get('#calendar').find('.vanilla-calendar-month').should('have.attr', 'data-calendar-selected-month', '4');
		cy.get('#calendar').find('.vanilla-calendar-arrow.vanilla-calendar-arrow_next').click();
		cy.get('#calendar').find('.vanilla-calendar-month').should('have.attr', 'data-calendar-selected-month', '5');
		for (let n = 0; n < 6; n++) {
			cy.get('#calendar').find('.vanilla-calendar-arrow.vanilla-calendar-arrow_prev').click();
		}
		cy.get('#calendar').find('.vanilla-calendar-month').should('have.attr', 'data-calendar-selected-month', '11');
		cy.get('#calendar').find('.vanilla-calendar-year').should('have.attr', 'data-calendar-selected-year', '2022');
	});
	it('Check days', () => {
		cy.visit('/');
		cy.get('#calendar').find('.vanilla-calendar-day__btn').then(($day) => {
			expect($day).to.have.length(35);
			$day[10].click();
		});
		cy.get('#calendar').find('.vanilla-calendar-day__btn.vanilla-calendar-day__btn_selected').should('have.attr', 'data-calendar-day', '2023-04-06');
	});
});
