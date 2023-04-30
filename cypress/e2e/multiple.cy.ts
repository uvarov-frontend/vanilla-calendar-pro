describe('Init multiple calendar', () => {
	it('Check availability of calendar', () => {
		cy.visit('/pages/multiple/index.html');
		cy.get('#calendar').children();
	});
	it('Check months', () => {
		cy.visit('/pages/multiple/index.html');
		cy.get('#calendar').find('.vanilla-calendar-month').then(($month) => {
			expect($month).to.have.length(2);
		});
	});
	it('Check years', () => {
		cy.visit('/pages/multiple/index.html');
		cy.get('#calendar').find('.vanilla-calendar-year').then(($year) => {
			expect($year).to.have.length(2);
		});
	});
	it('Check arrows', () => {
		cy.visit('/pages/multiple/index.html');
		cy.get('#calendar').find('.vanilla-calendar-arrow.vanilla-calendar-arrow_next').click();
		cy.get('#calendar').find('.vanilla-calendar-month:first').should('have.attr', 'data-calendar-selected-month', '4');
		cy.get('#calendar').find('.vanilla-calendar-month:last').should('have.attr', 'data-calendar-selected-month', '5');
		for (let n = 0; n < 5; n++) {
			cy.get('#calendar').find('.vanilla-calendar-arrow.vanilla-calendar-arrow_prev').click();
		}
		cy.get('#calendar').find('.vanilla-calendar-month:first').should('have.attr', 'data-calendar-selected-month', '11');
		cy.get('#calendar').find('.vanilla-calendar-month:last').should('have.attr', 'data-calendar-selected-month', '0');
		cy.get('#calendar').find('.vanilla-calendar-year:first').should('have.attr', 'data-calendar-selected-year', '2022');
		cy.get('#calendar').find('.vanilla-calendar-year:last').should('have.attr', 'data-calendar-selected-year', '2023');
	});
	it('Check days', () => {
		cy.visit('/pages/multiple/index.html');
		cy.get('#calendar').find('.vanilla-calendar-day__btn').then(($day) => {
			expect($day).to.have.length(70);
			$day[30].click();
		});
		cy.get('#calendar').find('.vanilla-calendar-day__btn').then(($day) => $day[45].click());
		cy.get('#calendar').find('.vanilla-calendar-day__btn.vanilla-calendar-day__btn_selected').then(($day) => expect($day).to.have.length(16));
		cy.get('#calendar').find('.vanilla-calendar-day__btn').then(($day) => $day[45].click());
		cy.get('#calendar').find('.vanilla-calendar-day__btn').then(($day) => $day[45].click());
		cy.get('#calendar').find('.vanilla-calendar-day__btn').then(($day) => expect($day).not.to.be.class('vanilla-calendar-day__btn_selected'));
	});
});
