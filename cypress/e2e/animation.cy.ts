const visit = () => cy.visit('/pages/animation/');

const monthOf = (id: string) => cy.get(id).find('[data-vc="month"]').invoke('attr', 'data-vc-month');

// Transitions last ~200ms, so racing them would be flaky. Starting every animation paused makes
// the intermediate state hold for as long as needed.
const freezeAnimations = () =>
  cy.window().then((win) => {
    const original = win.Element.prototype.animate;
    win.Element.prototype.animate = function (this: Element, ...args: Parameters<Element['animate']>) {
      const animation = original.apply(this, args);
      animation.pause();
      return animation;
    };
  });

const column = (index: number) => cy.get('#calendar-multiple [data-vc="column"]').eq(index);

const opacityFrames = (el: Element) => el.getAnimations().map((animation) => (animation.effect as KeyframeEffect).getKeyframes().map((frame) => frame.opacity));

const timings = (el: Element) =>
  el.getAnimations().map((animation) => {
    const timing = animation.effect!.getTiming();
    return { duration: timing.duration, easing: timing.easing };
  });

// Relative to a fixed reference, not the viewport: Cypress scrolls the element into view before
// clicking, so coordinates taken before and after a click would otherwise not be comparable.
const rowOffsets = (reference: Element, root: Element, selector: string) => {
  const referenceTop = reference.getBoundingClientRect().top;
  return [...root.querySelectorAll(selector)].map((row) => Math.round(row.getBoundingClientRect().top - referenceTop));
};

describe('Animation', () => {
  it('leaves the DOM untouched when the option is off', () => {
    visit();
    cy.get('#calendar-static').find('[data-vc-arrow="next"]').click();
    cy.get('#calendar-static').find('[data-vc-ghost]').should('not.exist');
    cy.get('#calendar-static').find('[data-vc-animating]').should('not.exist');
    cy.get('#calendar-static').find('[data-vc-clip]').should('not.exist');
    monthOf('#calendar-static').should('equal', '4');
  });

  it('keeps the outgoing month on a ghost layer while the new one is rendered', () => {
    visit();
    freezeAnimations();
    cy.get('#calendar-animated').find('[data-vc-arrow="next"]').click();

    cy.get('#calendar-animated [data-vc="dates"]').should('have.attr', 'data-vc-animating');
    cy.get('#calendar-animated [data-vc="content"]').should('have.attr', 'data-vc-clip');

    const ghost = '#calendar-animated [data-vc="content"] > [data-vc-ghost]';
    cy.get(ghost).find('[data-vc-date]').first().should('have.attr', 'data-vc-date', '2023-03-27');
    cy.get(ghost).should('have.attr', 'inert');
    cy.get(ghost).should('have.css', 'position', 'absolute');
    // proves the freeze works rather than the assertions merely being quick
    cy.wait(500);
    cy.get(ghost).should('exist');
    cy.get('#calendar-animated [data-vc="dates"] > [data-vc-dates="row"] [data-vc-date]').first().should('have.attr', 'data-vc-date', '2023-05-01');
  });

  it('removes the ghost once the animation is over and matches the static calendar', () => {
    visit();
    cy.get('#calendar-animated').find('[data-vc-arrow="next"]').click();
    cy.get('#calendar-static').find('[data-vc-arrow="next"]').click();

    cy.get('#calendar-animated [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-animated [data-vc-animating]').should('not.exist');
    cy.get('#calendar-animated [data-vc-clip]').should('not.exist');

    cy.get('#calendar-static [data-vc="dates"]')
      .invoke('html')
      .then((expected) => cy.get('#calendar-animated [data-vc="dates"]').invoke('html').should('equal', expected));
  });

  it('collapses interrupted switches instead of stacking ghosts', () => {
    visit();
    for (let n = 0; n < 4; n++) cy.get('#calendar-animated').find('[data-vc-arrow="next"]').click();
    for (let n = 0; n < 4; n++) cy.get('#calendar-static').find('[data-vc-arrow="next"]').click();

    cy.get('#calendar-animated [data-vc-ghost]').should('have.length.at.most', 1);
    monthOf('#calendar-animated').should('equal', '7');
    cy.get('#calendar-animated [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-static [data-vc="dates"]')
      .invoke('html')
      .then((expected) => cy.get('#calendar-animated [data-vc="dates"]').invoke('html').should('equal', expected));
  });

  it('cross-fades the wrapper when the calendar type changes', () => {
    visit();
    freezeAnimations();
    cy.get('#calendar-animated').find('[data-vc="month"]').click();

    cy.get('#calendar-animated [data-vc="wrapper"]').should('have.attr', 'data-vc-animating');
    cy.get('#calendar-animated > [data-vc-ghost] [data-vc="dates"]').should('exist');
    cy.get('#calendar-animated [data-vc="months"] [data-vc-months-month]').should('have.length', 12);
  });

  it('settles into the picker with no leftovers', () => {
    visit();
    cy.get('#calendar-animated').find('[data-vc="month"]').click();

    cy.get('#calendar-animated [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-animated [data-vc-animating]').should('not.exist');
    cy.get('#calendar-animated').should('have.attr', 'data-vc-type', 'month');
    cy.get('#calendar-animated [data-vc-months-month]').should('have.length', 12);
  });

  it('uses a different default duration per transition', () => {
    visit();
    freezeAnimations();

    cy.get('#calendar-animated').find('[data-vc-arrow="next"]').click();
    cy.get('#calendar-animated [data-vc="dates"]').then(($el) => {
      expect(timings($el[0])).to.deep.equal([{ duration: 250, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }]);
    });

    visit();
    freezeAnimations();
    cy.get('#calendar-animated').find('[data-vc="month"]').click();
    cy.get('#calendar-animated [data-vc="wrapper"]').then(($el) => {
      expect(timings($el[0])).to.deep.equal([{ duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }]);
    });
  });

  it('spreads a group-less object over both kinds of transition', () => {
    visit();
    freezeAnimations();

    cy.get('#calendar-multiple').find('[data-vc-arrow="next"]').click();
    cy.get('#calendar-multiple [data-vc="dates"]')
      .first()
      .then(($el) => {
        expect(timings($el[0])).to.deep.equal([{ duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }]);
      });

    visit();
    freezeAnimations();
    column(0).find('[data-vc="month"]').click();
    column(0)
      .find('[data-vc="wrapper"]')
      .then(($el) => {
        expect(timings($el[0])).to.deep.equal([{ duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }]);
      });
  });

  it('resolves timings separately for slide and fade', () => {
    visit();
    freezeAnimations();

    cy.get('#calendar-custom').find('[data-vc-arrow="next"]').click();
    cy.get('#calendar-custom [data-vc="dates"]').then(($el) => {
      expect(timings($el[0])).to.deep.equal([{ duration: 700, easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' }]);
    });

    visit();
    freezeAnimations();
    cy.get('#calendar-custom').find('[data-vc="month"]').click();
    cy.get('#calendar-custom [data-vc="wrapper"]').then(($el) => {
      expect(timings($el[0])).to.deep.equal([{ duration: 450, easing: 'ease-in-out' }]);
    });
  });

  it('ghosts every column of a multiple calendar', () => {
    visit();
    freezeAnimations();
    cy.get('#calendar-multiple').find('[data-vc-arrow="next"]').click();

    cy.get('#calendar-multiple [data-vc="content"] > [data-vc-ghost]').should('have.length', 2);
  });

  it('switches every column of a multiple calendar with no leftovers', () => {
    visit();
    cy.get('#calendar-multiple').find('[data-vc-arrow="next"]').click();

    cy.get('#calendar-multiple [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-multiple').should('equal', '4');
  });

  it('animates only the column whose type changed', () => {
    visit();
    freezeAnimations();
    // mark the neighbour's cells to catch a re-render
    column(1).find('[data-vc-date]').invoke('attr', 'data-mark', '1');
    column(0).find('[data-vc="month"]').click();

    column(0).find('[data-vc-ghost]').should('have.length', 1);
    column(1).find('[data-vc-ghost]').should('not.exist');
    column(1).find('[data-vc-animating]').should('not.exist');
    column(1).find('[data-vc-date][data-mark]').should('have.length', 35);
  });

  it('animates only the column that leaves the picker', () => {
    visit();
    column(0).find('[data-vc="month"]').click();
    cy.get('#calendar-multiple [data-vc-ghost]').should('not.exist');

    column(1).find('[data-vc-date]').invoke('attr', 'data-mark', '1');
    freezeAnimations();
    column(0).find('[data-vc-months-month="6"]').click();

    // closing rebuilds the whole grid, yet only the column that left the picker may animate
    column(0).find('[data-vc-ghost]').should('have.length', 1);
    column(1).find('[data-vc-ghost]').should('not.exist');
    column(1).find('[data-vc-animating]').should('not.exist');
    // the grid really was rebuilt, so the assertions above do not pass by inertia
    column(1).find('[data-vc-date][data-mark]').should('not.exist');
  });

  it('fades the dim of neighbouring columns in both directions', () => {
    visit();
    freezeAnimations();
    column(0).find('[data-vc="month"]').click();
    column(1).then(($col) => expect(opacityFrames($col[0])).to.deep.equal([['1', '0.3']]));

    // closing rebuilds the grid, so the dim has to be played back explicitly
    visit();
    column(0).find('[data-vc="month"]').click();
    cy.get('#calendar-multiple [data-vc-ghost]').should('not.exist');
    freezeAnimations();
    column(0).find('[data-vc-months-month="6"]').click();
    column(1).then(($col) => expect(opacityFrames($col[0])).to.deep.equal([['0.3', '1']]));
  });

  it('keeps the outgoing rows exactly where they were', () => {
    visit();
    column(0).find('[data-vc="year"]').click();
    cy.get('#calendar-multiple [data-vc-ghost]').should('not.exist');

    column(0).then(($column) => {
      const before = rowOffsets($column[0], $column[0], '[data-vc-years="row"]');
      expect(before).to.have.length(3);

      freezeAnimations();
      column(0).find('[data-vc-arrow="next"]').click();
      column(0).then(() => {
        const ghost = $column[0].querySelector('[data-vc-ghost]')!;
        expect(rowOffsets($column[0], ghost, '[data-vc-years="row"]')).to.deep.equal(before);
      });
    });
  });

  it('keeps the outgoing days in place when the type changes', () => {
    visit();
    // June (5 weeks) + July (6): the column stretches to its neighbour, and the grow-0 rule for
    // the date grid is keyed on data-vc-type, which changes mid-transition
    cy.get('#calendar-multiple').find('[data-vc-arrow="next"]').click();
    cy.get('#calendar-multiple').find('[data-vc-arrow="next"]').click();
    cy.get('#calendar-multiple [data-vc-ghost]').should('not.exist');
    column(0).find('[data-vc-dates="row"]').should('have.length', 5);

    column(0).then(($column) => {
      const before = rowOffsets($column[0], $column[0], '[data-vc-dates="row"]');

      freezeAnimations();
      column(0).find('[data-vc="month"]').click();
      column(0).then(() => expect(rowOffsets($column[0], $column[0], '[data-vc-dates="row"]')).to.deep.equal(before));
    });
  });

  it('leaves untouched columns alone when one column switches type', () => {
    visit();
    column(0).find('[data-vc="month"]').click();
    cy.get('#calendar-multiple [data-vc-ghost]').should('not.exist');

    column(0).find('[data-vc-months-month]').should('have.length', 12);
    column(1).find('[data-vc-date]').should('have.length', 35);
    column(1).find('[data-vc="wrapper"]').children().should('have.length.greaterThan', 0);
  });
});
