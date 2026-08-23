const visit = () => cy.visit('/pages/week/');

const datesOf = (id: string) => {
  cy.get(`${id} [data-vc-ghost]`).should('not.exist');
  return cy.get(`${id} [data-vc-date]`).then(($dates) => Cypress._.map($dates, (date: HTMLElement) => date.dataset.vcDate));
};

const titleOf = (id: string) => cy.get(`${id} [data-vc="month"]`).first().invoke('text');

describe('Week type', () => {
  it('renders a single row of seven days', () => {
    visit();
    cy.get('#calendar-week [data-vc-dates="row"]').should('have.length', 1);
    cy.get('#calendar-week [data-vc-date]').should('have.length', 7);
    cy.get('#calendar-week').should('have.attr', 'data-vc-type', 'week');
  });

  it('anchors on the week holding the first day of the selected month', () => {
    visit();
    datesOf('#calendar-week').should('deep.equal', ['2023-03-27', '2023-03-28', '2023-03-29', '2023-03-30', '2023-03-31', '2023-04-01', '2023-04-02']);
    titleOf('#calendar-week').should('equal', 'April');
  });

  it('anchors on the selected date when there is one', () => {
    visit();
    datesOf('#calendar-week-numbers').should('deep.equal', ['2023-04-17', '2023-04-18', '2023-04-19', '2023-04-20', '2023-04-21', '2023-04-22', '2023-04-23']);
    cy.get('#calendar-week-numbers [data-vc-date-selected]').should('have.attr', 'data-vc-date', '2023-04-19');
  });

  it('steps a week at a time with the arrows', () => {
    visit();
    cy.get('#calendar-week [data-vc-arrow="next"]').click();
    datesOf('#calendar-week').should('deep.equal', ['2023-04-03', '2023-04-04', '2023-04-05', '2023-04-06', '2023-04-07', '2023-04-08', '2023-04-09']);

    cy.get('#calendar-week [data-vc-arrow="prev"]').click();
    cy.get('#calendar-week [data-vc-arrow="prev"]').click();
    datesOf('#calendar-week').should('deep.equal', ['2023-03-20', '2023-03-21', '2023-03-22', '2023-03-23', '2023-03-24', '2023-03-25', '2023-03-26']);
  });

  it('titles a straddling week by the month that owns it', () => {
    visit();
    titleOf('#calendar-week').should('equal', 'April');
    cy.get('#calendar-week [data-vc-arrow="prev"]').click();
    titleOf('#calendar-week').should('equal', 'March');
  });

  it('marks every day of the strip as belonging to the current month', () => {
    visit();
    cy.get('#calendar-week [data-vc-date-month="current"]').should('have.length', 7);
    cy.get('#calendar-week [data-vc-date-btn]').should('have.length', 7);
  });

  it('numbers the displayed week', () => {
    visit();
    cy.get('#calendar-week-numbers [data-vc-week-number]').should('have.length', 1);
    cy.get('#calendar-week-numbers [data-vc-week-number]').should('have.attr', 'data-vc-week-number', '16');
  });

  it('returns to the week after a trip through the month picker', () => {
    visit();
    cy.get('#calendar-week [data-vc="month"]').click();
    cy.get('#calendar-week [data-vc-months-month]').should('have.length', 12);

    cy.get('#calendar-week [data-vc-months-month="6"]').click();
    cy.get('#calendar-week').should('have.attr', 'data-vc-type', 'week');
    cy.get('#calendar-week [data-vc-dates="row"]').should('have.length', 1);
    datesOf('#calendar-week').should('deep.equal', ['2023-06-26', '2023-06-27', '2023-06-28', '2023-06-29', '2023-06-30', '2023-07-01', '2023-07-02']);
  });

  it('returns to the week after a trip through the year picker', () => {
    visit();
    cy.get('#calendar-week [data-vc="year"]').click();
    cy.get('#calendar-week [data-vc-years-year]').should('have.length', 15);

    cy.get('#calendar-week [data-vc-years-year="2024"]').click();
    cy.get('#calendar-week').should('have.attr', 'data-vc-type', 'week');
    cy.get('#calendar-week [data-vc-date]').should('have.length', 7);
    titleOf('#calendar-week').should('equal', 'April');
  });

  it('re-anchors the displayed dates when firstWeekday changes', () => {
    visit();
    cy.get('#btn-sunday-first').click();

    cy.get('#calendar-week [data-vc-week-day]').first().should('have.attr', 'data-vc-week-day', '0');
    cy.get('#calendar-week [data-vc-date]').first().should('have.attr', 'data-vc-date', '2023-03-26');
  });

  it('does not cross a year when year switching is disabled', () => {
    visit();
    cy.get('#calendar-week-year-locked [data-vc-arrow="next"]').should('not.be.visible');
    datesOf('#calendar-week-year-locked').should('deep.equal', [
      '2023-12-25',
      '2023-12-26',
      '2023-12-27',
      '2023-12-28',
      '2023-12-29',
      '2023-12-30',
      '2023-12-31',
    ]);
  });
});

export {};
