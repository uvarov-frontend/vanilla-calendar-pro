// color-contrast and the landmark/region rules are excluded on purpose: they are about the demo
// page's own styling and structure, not the calendar's markup, which is what this checks.
const axeOptions = {
  runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
  rules: {
    'color-contrast': { enabled: false },
    'landmark-one-main': { enabled: false },
    region: { enabled: false },
  },
};

const checkA11y = (ctx?: string) => {
  cy.injectAxe();
  cy.checkA11y(ctx as never, axeOptions as never);
};

describe('Accessibility (axe-core)', () => {
  it('default calendar view has no ARIA violations', () => {
    cy.visit('/');
    checkA11y();
  });

  it('month picker view has no ARIA violations', () => {
    cy.visit('/');
    cy.get('.vc-month').click();
    checkA11y();
  });

  it('year picker view has no ARIA violations', () => {
    cy.visit('/');
    cy.get('.vc-year').click();
    checkA11y();
  });

  it('type: multiple calendar view has no ARIA violations', () => {
    cy.visit('/pages/multiple/index.html');
    checkA11y();
  });

  it('type: week calendar view has no ARIA violations', () => {
    cy.visit('/pages/week/');
    checkA11y('#calendar-week');
  });

  it('week numbers have no ARIA violations', () => {
    cy.visit('/pages/week-numbers/');
    checkA11y();
  });

  it('collapsed calendar view has no ARIA violations', () => {
    cy.visit('/pages/gestures/');
    cy.get('#calendar-bounded [data-vc="collapse"]').click();
    cy.get('#calendar-bounded').should('have.attr', 'data-vc-type', 'week');
    checkA11y('#calendar-bounded');
  });

  it('every option combination carrying its own ARIA markup has no violations', () => {
    cy.visit('/pages/a11y/');
    checkA11y();
  });

  it('inputMode popup has no ARIA violations, open or closed', () => {
    cy.visit('/pages/input/');
    cy.get('#calendar-input').click();
    cy.get('[data-vc-input]').should('exist');
    checkA11y();
    cy.get('h1').click();
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-calendar-hidden');
    checkA11y();
  });
});

describe('Accessibility (keyboard and focus)', () => {
  it('gives every grid a single tab stop', () => {
    cy.visit('/pages/a11y/');
    cy.get('#calendar-month [data-vc-months-month][tabindex="0"]').should('have.length', 1);
    cy.get('#calendar-year [data-vc-years-year][tabindex="0"]').should('have.length', 1);
    cy.get('#calendar-multiple-week-numbers [data-vc="dates"]').each(($datesEl) => {
      cy.wrap($datesEl).find('[data-vc-date-btn][tabindex="0"]').should('have.length', 1);
    });
  });

  it('anchors that tab stop on the selected date', () => {
    cy.visit('/pages/a11y/');
    cy.get('#calendar-ranged [data-vc-date-btn][tabindex="0"]').should('have.attr', 'aria-label', 'April 10, 2023');
  });

  it('marks the selection on the gridcell, which is the role that supports it', () => {
    cy.visit('/pages/a11y/');
    cy.get('#calendar-ranged [data-vc-date="2023-04-10"]').should('have.attr', 'aria-selected', 'true');
    cy.get('#calendar-ranged [data-vc-date="2023-04-10"] [data-vc-date-btn]').should('not.have.attr', 'aria-selected');
  });

  it('does not take the focus when a picker is the opening view', () => {
    cy.visit('/pages/a11y/');
    cy.get('#calendar-month [data-vc-months-month]').should('exist');
    cy.document().its('activeElement.tagName').should('eq', 'BODY');
  });

  it('moves the focus into the picker the user opened', () => {
    cy.visit('/');
    cy.get('.vc-year').click();
    cy.focused().should('have.attr', 'data-vc-years-year');
  });

  it('keeps the focus on the arrow while browsing the year list', () => {
    cy.visit('/');
    cy.get('.vc-year').click();
    cy.get('[data-vc-arrow="next"]').click();
    cy.focused().should('have.attr', 'data-vc-arrow', 'next');
  });

  it('moves the focus with the arrow keys without scrolling the page along', () => {
    cy.visit('/');
    cy.get('[data-vc-date-btn][tabindex="0"]').focus();
    cy.focused().trigger('keydown', { key: 'ArrowRight' });
    cy.focused().should('have.attr', 'tabindex', '0').and('have.attr', 'data-vc-date-btn');
    cy.window().its('scrollY').should('eq', 0);
  });

  it('keeps arrow-key focus inside its grid and leaves disabled dates unfocusable', () => {
    cy.visit('/pages/a11y/');
    cy.get('#calendar-locked-titles [data-vc-date-btn][aria-disabled="true"]').first().should('be.disabled');

    cy.get('#calendar-clickable-headers [data-vc-date-btn]').then(($buttons) => {
      cy.wrap($buttons[0]).focus().trigger('keydown', { key: 'ArrowLeft' });
      cy.focused().should('have.attr', 'data-vc-date-btn');

      cy.wrap($buttons[$buttons.length - 1])
        .focus()
        .trigger('keydown', { key: 'ArrowRight' });
      cy.focused().should('have.attr', 'data-vc-date-btn');
    });
  });

  it('gives a clickable weekday header a target big enough to hit', () => {
    cy.visit('/pages/a11y/');
    cy.get('#calendar-clickable-headers [data-vc-week-day-btn]')
      .first()
      .then(($btn) => {
        const { width, height } = $btn[0].getBoundingClientRect();
        expect(width).to.be.at.least(24);
        expect(height).to.be.at.least(24);
      });
  });

  it('names every time control once, and wraps none of them in an empty label', () => {
    cy.visit('/');
    cy.get('#calendar [data-vc="time"] label').should('not.exist');
    cy.get('#calendar [data-vc="time"] input[name]').then(($inputs) => {
      const names = [...$inputs].map((input) => (input as HTMLInputElement).name);
      expect(new Set(names).size, 'duplicate form control name').to.eq(names.length);
    });
  });

  it('takes the closed popup out of the focus order and the accessibility tree', () => {
    cy.visit('/pages/a11y/');
    cy.get('#calendar-input').click();
    cy.get('[data-vc-input]').should('not.have.attr', 'inert');
    cy.get('[data-vc-input]').should('not.have.attr', 'aria-hidden');
    cy.get('h1').click();
    cy.get('[data-vc-input]').should('have.attr', 'inert');
    cy.get('[data-vc-input]').should('have.attr', 'aria-hidden', 'true');
  });

  it('lets the keyboard walk from the field into the popup and back out with Escape', () => {
    cy.visit('/pages/a11y/');
    cy.get('#calendar-input').focus().click();
    cy.get('[data-vc-input]').should('not.have.attr', 'inert');
    cy.get('#calendar-input').trigger('keydown', { key: 'ArrowDown' });
    cy.focused().should('exist');
    cy.document().then((doc) => {
      expect(doc.querySelector('[data-vc-input]')?.contains(doc.activeElement)).to.eq(true);
    });
    cy.focused().trigger('keydown', { key: 'Escape' });
    cy.focused().should('have.id', 'calendar-input');
  });

  it('tells the field that it opens a picker', () => {
    cy.visit('/pages/a11y/');
    cy.get('#calendar-input').should('have.attr', 'aria-haspopup', 'dialog').and('not.have.attr', 'aria-expanded');
    cy.get('#calendar-input').click();
    cy.get('[data-vc-input]').should('have.attr', 'role', 'dialog');
  });
});
