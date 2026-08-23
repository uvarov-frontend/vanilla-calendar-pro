const visit = () => cy.visit('/pages/gestures/');

const freezeAnimations = () =>
  cy.window().then((win) => {
    const original = win.Element.prototype.animate;
    win.Element.prototype.animate = function (this: Element, ...args: Parameters<Element['animate']>) {
      const animation = original.apply(this, args);
      animation.pause();
      return animation;
    };
  });

const datesOf = (id: string) => {
  cy.get(`${id} [data-vc-ghost]`).should('not.exist');
  return cy.get(`${id} [data-vc-date]`).then(($dates) => Cypress._.map($dates, (date: HTMLElement) => date.dataset.vcDate));
};

const dragControl = (id: string, dy: number, placed = false) => {
  cy.get(`${id} [data-vc="collapse"]`).then(($el) => {
    const box = $el[0].getBoundingClientRect();
    const x = Math.round(box.left + box.width / 2);
    const y = Math.round(box.top + box.height / 2);
    const options = { pointerId: 1, isPrimary: true, button: 0, eventConstructor: 'PointerEvent', force: true } as const;

    cy.wrap($el).trigger('pointerdown', { ...options, clientX: x, clientY: y });
    cy.get(id).trigger('pointermove', { ...options, clientX: x, clientY: y + Math.sign(dy) * 12 });
    cy.get(id).trigger('pointermove', { ...options, clientX: x, clientY: y + dy });
    if (placed) cy.wait(250);
    cy.get(id).trigger('pointerup', { ...options, clientX: x, clientY: y + dy });
  });
};

describe('Collapse', () => {
  it('renders the control only where the option is on', () => {
    visit();
    cy.get('#calendar-gestures [data-vc="collapse"]').should('exist');
    cy.get('#calendar-static [data-vc="collapse"]').should('not.exist');
    cy.get('#calendar-multiple [data-vc="collapse"]').should('not.exist');
  });

  it('reports the expanded state to assistive technology', () => {
    visit();
    cy.get('#calendar-gestures [data-vc="collapse"]').should('have.attr', 'aria-expanded', 'true');
    cy.get('#calendar-collapsed [data-vc="collapse"]').should('have.attr', 'aria-expanded', 'false');
  });

  it('updates navigation semantics while the expanded layout is staged', () => {
    visit();
    freezeAnimations();
    cy.get('#calendar-collapsed [data-vc="collapse"]').click();

    cy.get('#calendar-collapsed [data-vc="dates"]').should('have.attr', 'data-vc-collapsing');
    cy.get('#calendar-collapsed [data-vc="collapse"]').should('have.attr', 'aria-expanded', 'true').and('have.attr', 'aria-label', 'Collapse to a single week');
    cy.get('#calendar-collapsed [data-vc-arrow="prev"]').should('have.attr', 'aria-label', 'Previous month');
    cy.get('#calendar-collapsed [data-vc-arrow="next"]').should('have.attr', 'aria-label', 'Next month');
  });

  it('collapses the month onto the week holding the selected date', () => {
    visit();
    cy.get('#calendar-gestures [data-vc-dates="row"]').should('have.length', 5);

    cy.get('#calendar-gestures [data-vc="collapse"]').click();

    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');
    cy.get('#calendar-gestures [data-vc-dates="row"]').should('have.length', 1);
    datesOf('#calendar-gestures').should('deep.equal', ['2023-04-17', '2023-04-18', '2023-04-19', '2023-04-20', '2023-04-21', '2023-04-22', '2023-04-23']);
    cy.get('#calendar-gestures [data-vc="collapse"]').should('have.attr', 'aria-expanded', 'false');
  });

  it('re-anchors onto a date selected after the month was rendered', () => {
    visit();
    cy.get('#calendar-gestures [data-vc-date="2023-04-03"] [data-vc-date-btn]').click();
    cy.get('#calendar-gestures [data-vc="collapse"]').click();

    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');
    datesOf('#calendar-gestures').should('deep.equal', ['2023-04-03', '2023-04-04', '2023-04-05', '2023-04-06', '2023-04-07', '2023-04-08', '2023-04-09']);
  });

  it('expands back to the month around the same week', () => {
    visit();
    cy.get('#calendar-gestures [data-vc="collapse"]').click();
    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');

    cy.get('#calendar-gestures [data-vc="collapse"]').click();
    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'default');
    cy.get('#calendar-gestures [data-vc-dates="row"]').should('have.length', 5);
    cy.get('#calendar-gestures [data-vc="collapse"]').should('have.attr', 'aria-expanded', 'true');
  });

  it('leaves nothing behind on the grid once it settles', () => {
    visit();
    cy.get('#calendar-gestures [data-vc="collapse"]').click();
    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');

    cy.get('#calendar-gestures [data-vc-collapsing]').should('not.exist');

    cy.get('#calendar-gestures [data-vc="collapse"]').click();
    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'default');
    cy.get('#calendar-gestures [data-vc-collapsing]').should('not.exist');
    cy.get('#calendar-gestures [data-vc="dates"]').should('have.css', 'overflow', 'visible');
  });

  it('clips the grid and slides the target week up while it runs', () => {
    visit();
    freezeAnimations();
    cy.get('#calendar-gestures [data-vc="collapse"]').click();

    cy.get('#calendar-gestures [data-vc="dates"]').should('have.attr', 'data-vc-collapsing');
    cy.get('#calendar-gestures [data-vc="dates"]').should('have.css', 'overflow', 'clip');

    cy.get('#calendar-gestures [data-vc-dates="row"]').should('have.length', 5);

    cy.get('#calendar-gestures [data-vc="dates"]').then(($el) => {
      const rows = Array.from($el[0].querySelectorAll<HTMLElement>('[data-vc-dates="row"]'));
      const target = rows[3];
      const offset = target.offsetTop - rows[0].offsetTop;

      rows.forEach((row) => {
        const frames = (row.getAnimations()[0].effect as KeyframeEffect).getKeyframes();
        expect(frames[1].transform).to.equal(`translateY(${-offset}px)`);
        expect(frames[1].opacity).to.equal(row === target ? '1' : '0');
      });

      const height = ($el[0].getAnimations()[0].effect as KeyframeEffect).getKeyframes();
      expect(height[1].height).to.equal(`${target.offsetHeight}px`);
    });
  });

  it('uses the collapse timing group', () => {
    visit();
    freezeAnimations();
    cy.get('#calendar-gestures [data-vc="collapse"]').click();

    cy.get('#calendar-gestures [data-vc="dates"]').then(($el) => {
      const timing = $el[0].getAnimations()[0].effect!.getTiming();
      expect(timing.duration).to.equal(300);
      expect(timing.easing).to.equal('cubic-bezier(0.4, 0, 0.2, 1)');
    });
  });

  it('re-anchors on the month the user browsed to', () => {
    visit();
    cy.get('#calendar-gestures [data-vc-arrow="next"]').click();
    cy.get('#calendar-gestures [data-vc-arrow="next"]').click();
    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');

    cy.get('#calendar-gestures [data-vc="collapse"]').click();
    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');
    datesOf('#calendar-gestures').should('deep.equal', ['2023-05-29', '2023-05-30', '2023-05-31', '2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04']);
  });

  it('steps by week once collapsed and by month once expanded', () => {
    visit();
    cy.get('#calendar-gestures [data-vc="collapse"]').click();
    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');

    cy.get('#calendar-gestures [data-vc-arrow="next"]').click();
    datesOf('#calendar-gestures').should('deep.equal', ['2023-04-24', '2023-04-25', '2023-04-26', '2023-04-27', '2023-04-28', '2023-04-29', '2023-04-30']);

    cy.get('#calendar-gestures [data-vc="collapse"]').click();
    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'default');
    cy.get('#calendar-gestures [data-vc-arrow="next"]').click();
    cy.get('#calendar-gestures [data-vc="month"]').first().should('have.text', 'May');
  });

  it('collapses when the control is dragged up', () => {
    visit();
    dragControl('#calendar-gestures', -100);

    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');
    cy.get('#calendar-gestures [data-vc-dates="row"]').should('have.length', 1);
    cy.get('#calendar-gestures [data-vc-collapsing]').should('not.exist');
    cy.get('#calendar-gestures').should('not.have.attr', 'data-vc-dragging');
  });

  it('ignores the grabber losing implicit touch capture when capture moves to the calendar', () => {
    visit();
    cy.get('#calendar-gestures [data-vc="collapse"]').then(($el) => {
      const box = $el[0].getBoundingClientRect();
      const x = Math.round(box.left + box.width / 2);
      const y = Math.round(box.top + box.height / 2);
      const options = { pointerId: 1, isPrimary: true, button: 0, pointerType: 'touch', eventConstructor: 'PointerEvent', force: true } as const;

      cy.wrap($el).trigger('pointerdown', { ...options, clientX: x, clientY: y });
      cy.get('#calendar-gestures').trigger('pointermove', { ...options, clientX: x, clientY: y - 12 });
      cy.wrap($el).trigger('lostpointercapture', { ...options, clientX: x, clientY: y - 12 });
      cy.get('#calendar-gestures').trigger('pointermove', { ...options, clientX: x, clientY: y - 100 });
      cy.get('#calendar-gestures').trigger('pointerup', { ...options, clientX: x, clientY: y - 100 });
    });

    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');
  });

  it('springs back when the drag stops short', () => {
    visit();
    dragControl('#calendar-gestures', -20);

    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'default');
    cy.get('#calendar-gestures [data-vc-dates="row"]').should('have.length', 5);
    cy.get('#calendar-gestures [data-vc-collapsing]').should('not.exist');
  });

  it('expands when the control is dragged down', () => {
    visit();
    dragControl('#calendar-collapsed', 100);

    cy.get('#calendar-collapsed').should('have.attr', 'data-vc-type', 'default');
    cy.get('#calendar-collapsed [data-vc-dates="row"]').should('have.length', 5);
    cy.get('#calendar-collapsed [data-vc-collapsing]').should('not.exist');
  });

  it('uses the same commit distance while expanding as while collapsing', () => {
    visit();
    dragControl('#calendar-collapsed', 50, true);

    cy.get('#calendar-collapsed').should('have.attr', 'data-vc-type', 'default');
    cy.get('#calendar-collapsed [data-vc-dates="row"]').should('have.length', 5);
  });

  it('does not toggle again on the click that follows a drag', () => {
    visit();
    dragControl('#calendar-gestures', -100);
    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');

    cy.get('#calendar-gestures [data-vc="collapse"]').trigger('click');
    cy.get('#calendar-gestures').should('have.attr', 'data-vc-type', 'week');
  });

  it('refuses to pair with the multiple type', () => {
    visit();
    cy.get('#btn-invalid-collapse').click();
    cy.get('#log').should('contain.text', 'init() threw').and('contain.text', 'only supported by the «default» and «week»');
    cy.get('#calendar-invalid').should('not.have.attr', 'data-vc');
  });
});

export {};
