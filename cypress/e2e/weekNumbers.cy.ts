const getMiddles = (containerSelector: string, itemSelector: string) =>
  cy
    .get(containerSelector)
    .find(itemSelector)
    .then(($els) => [...$els].map((el) => Math.round(el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2)));

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

  it('lines every number up with the row it counts', () => {
    cy.visit('/pages/week-numbers/');
    ['#calendar-2026', '#calendar-2025', '#calendar-sunday-start'].forEach((calendar) => {
      getMiddles(calendar, '[data-vc-dates="row"]').then((rows) => {
        getMiddles(calendar, '[data-vc-week-number]').should('deep.equal', rows);
      });
    });
  });

  it('lines them up under a clickable weekday header too', () => {
    cy.visit('/pages/a11y/');
    getMiddles('#calendar-clickable-headers', '[data-vc-dates="row"]').then((rows) => {
      getMiddles('#calendar-clickable-headers', '[data-vc-week-number]').should('deep.equal', rows);
    });
  });
});
