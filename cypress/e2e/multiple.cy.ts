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
});
