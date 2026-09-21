describe('Development workbench', () => {
  it('searches scenarios and opens the matching page', () => {
    cy.visit('/');
    cy.get('body').trigger('keydown', { key: '/' });
    cy.get('#dev-search').should('have.focus');
    cy.get('#dev-search').type('swipe{enter}');
    cy.location('pathname').should('eq', '/pages/gestures/');
    cy.get('h1').should('contain.text', 'Swipe & collapse');
    cy.get('[aria-current="page"]').should('contain.text', 'Swipe & collapse');
    cy.get('#calendar-gestures').should('have.attr', 'data-vc', 'calendar');
    cy.get('#dev-search').type('no-such-scenario');
    cy.get('.dev-search-empty').should('be.visible');
    cy.get('.dev-nav-link:visible').should('have.length', 0);
    cy.get('#dev-search').clear();
    cy.get('.dev-nav-link:not([hidden])').should('have.length', 14);
    cy.get('.dev-nav-link').last().scrollIntoView().should('be.visible');
  });

  it('loads the actual scenario source and returns to the existing preview', () => {
    cy.visit('/');
    cy.get('[data-vc-date="2023-04-06"] button').click();
    cy.get('#state-dates').should('have.text', '["2023-04-06"]');
    cy.get('#dev-source-tab').click();
    cy.get('#dev-source').should('be.visible');
    cy.get('#dev-source-code').should('contain.text', "new Calendar('#calendar'").and('contain.text', 'selectionTimeMode: 12');
    cy.get('#dev-copy').should('not.be.disabled');
    cy.get('#dev-source-code .hljs-keyword').should('contain.text', 'import');
    cy.get('#dev-source-tab').trigger('keydown', { key: 'ArrowLeft' });
    cy.get('#dev-preview-tab').should('have.focus').and('have.attr', 'aria-selected', 'true');
    cy.get('#calendar [data-vc-date-selected]').should('have.attr', 'data-vc-date', '2023-04-06');
    cy.get('#dev-reset').click();
    cy.get('#state-dates').should('have.text', '[]');
  });

  it('updates the state inspector after month navigation', () => {
    cy.visit('/');
    cy.get('#state-month').should('have.text', '2023-04');
    cy.get('#calendar [data-vc-arrow="next"]').click();
    cy.get('#state-month').should('have.text', '2023-05');
  });

  it('persists the theme across scenarios and updates the calendar theme', () => {
    cy.visit('/', { onBeforeLoad: (win) => win.localStorage.setItem('vcp-workbench-theme', 'light') });
    cy.get('button[data-theme-mode="dark"]').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.get('#calendar').should('have.attr', 'data-vc-theme', 'dark');
    cy.get('[data-scenario="multiple"]').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.get('#calendar').should('have.attr', 'data-vc-theme', 'dark');
    cy.get('button[data-theme-mode="light"]').click();
    cy.get('#calendar').should('have.attr', 'data-vc-theme', 'light');
  });

  it('changes the source background and syntax colors with the page theme', () => {
    cy.visit('/', { onBeforeLoad: (win) => win.localStorage.setItem('vcp-workbench-theme', 'light') });
    cy.get('#dev-source-tab').click();
    cy.get('#dev-source').should('have.css', 'background-color', 'rgb(246, 248, 250)');
    cy.get('#dev-source-code .hljs-keyword').first().should('have.css', 'color', 'rgb(207, 34, 46)');
    cy.get('button[data-theme-mode="dark"]').click();
    cy.get('#dev-source').should('have.css', 'background-color', 'rgb(10, 13, 17)');
    cy.get('#dev-source-code .hljs-keyword').first().should('have.css', 'color', 'rgb(255, 123, 114)');
    cy.get('button[data-theme-mode="light"]').click();
    cy.get('#dev-source').should('have.css', 'background-color', 'rgb(246, 248, 250)');
  });

  it('jumps from source to a specific preview with a shareable anchor', () => {
    cy.visit('/pages/a11y/');
    cy.get('#dev-source-tab').click();
    cy.get('#dev-jump').select('case-calendar-popups');
    cy.location('hash').should('eq', '#case-calendar-popups');
    cy.get('#dev-preview').should('be.visible');
    cy.get('#calendar-popups').should('be.visible');
  });

  it('opens mobile navigation, closes with Escape, and keeps the page within the viewport', () => {
    cy.viewport(390, 844);
    cy.visit('/');
    cy.get('#dev-sidebar').should('not.be.visible');
    cy.get('#dev-menu').click();
    cy.get('#dev-search').should('have.focus');
    cy.get('#dev-menu').should('have.attr', 'aria-expanded', 'true');
    cy.get('#dev-search').trigger('keydown', { key: 'Escape' });
    cy.get('#dev-sidebar').should('not.be.visible');
    cy.get('#dev-menu').should('have.focus').and('have.attr', 'aria-expanded', 'false');
    cy.get('#dev-menu').click();
    cy.get('.dev-workspace').should('have.attr', 'inert');
    cy.get('#dev-menu-close').click();
    cy.get('.dev-workspace').should('not.have.attr', 'inert');
    cy.get('#dev-sidebar').should('not.be.visible');
    cy.get('#dev-menu').should('have.focus');
    cy.document().then((doc) => expect(doc.documentElement.scrollWidth).to.equal(doc.documentElement.clientWidth));
  });
});
