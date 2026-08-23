const visit = () => cy.visit('/pages/gestures/');

const monthOf = (id: string) => cy.get(`${id} [data-vc="month"]`).first().invoke('attr', 'data-vc-month');

const surface = (id: string) => cy.get(`${id} [data-vc="content"]`).first();

const dragBy = (id: string, dx: number, dy = 0) => {
  surface(id).then(($el) => {
    const box = $el[0].getBoundingClientRect();
    const startX = Math.round(box.left + box.width / 2);
    const startY = Math.round(box.top + box.height / 2);
    const options = { pointerId: 1, isPrimary: true, button: 0, eventConstructor: 'PointerEvent', force: true } as const;

    cy.wrap($el).trigger('pointerdown', { ...options, clientX: startX, clientY: startY });
    cy.wrap($el).trigger('pointermove', { ...options, clientX: startX + Math.sign(dx) * 12, clientY: startY + Math.sign(dy) * 12 });
    cy.wrap($el).trigger('pointermove', { ...options, clientX: startX + dx, clientY: startY + dy });
  });
};

const release = (id: string, dx: number, dy = 0) => {
  surface(id).then(($el) => {
    const box = $el[0].getBoundingClientRect();
    cy.wrap($el).trigger('pointerup', {
      pointerId: 1,
      isPrimary: true,
      button: 0,
      eventConstructor: 'PointerEvent',
      force: true,
      clientX: Math.round(box.left + box.width / 2) + dx,
      clientY: Math.round(box.top + box.height / 2) + dy,
    });
  });
};

const rest = () => cy.wait(250);

const flick = (id: string, dx: number, dy = 0) => {
  dragBy(id, dx, dy);
  release(id, dx, dy);
};

const swipe = (id: string, dx: number, dy = 0) => {
  dragBy(id, dx, dy);
  rest();
  release(id, dx, dy);
};

const raw = (el: Element, type: string, clientX: number, clientY: number) =>
  el.dispatchEvent(
    new PointerEvent(type, {
      pointerId: 1,
      isPrimary: true,
      button: 0,
      buttons: type === 'pointerup' ? 0 : 1,
      clientX,
      clientY,
      bubbles: true,
      cancelable: true,
    }),
  );

const assertClipped = (id: string) => {
  cy.get(id).then(($cal) => {
    $cal[0].querySelectorAll<HTMLElement>('[data-vc-ghost]').forEach((ghost) => {
      const parent = ghost.parentElement as HTMLElement;
      expect(parent.hasAttribute('data-vc-clip'), 'ghost parent is marked as clipping').to.equal(true);
      expect(getComputedStyle(parent).overflow, 'ghost parent actually clips').to.equal('clip');
      expect(getComputedStyle(parent).position, 'ghost is positioned against its clipping parent').to.equal('relative');
    });
  });
};

describe('Swipe', () => {
  it('ignores pointers when the option is off', () => {
    visit();
    swipe('#calendar-static', -300);
    cy.get('#calendar-static [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-static').should('equal', '3');
  });

  it('stages the neighbouring month without moving the calendar onto it', () => {
    visit();
    dragBy('#calendar-gestures', -120);

    cy.get('#calendar-gestures [data-vc="dates"]').should('have.attr', 'data-vc-animating');
    cy.get('#calendar-gestures [data-vc="content"]').should('have.attr', 'data-vc-clip');

    cy.get('#calendar-gestures').then(($cal) => {
      const cal = $cal[0];
      const inGhost = [...cal.querySelectorAll<HTMLElement>('[data-vc-ghost] [data-vc-date]')].map((date) => date.dataset.vcDate);
      const live = [...cal.querySelectorAll<HTMLElement>('[data-vc="dates"] [data-vc-date]')].map((date) => date.dataset.vcDate);

      expect(live, 'the real grid still holds the current month').to.include('2023-04-15');
      expect(inGhost, 'the ghost holds the incoming month').to.include('2023-05-15');
      expect(cal.querySelector('[data-vc="month"]')).to.have.text('April');
    });

    release('#calendar-gestures', -120);
  });

  it('keeps the content under the finger, pixel for pixel', () => {
    visit();
    cy.get('#calendar-gestures [data-vc="dates"]').then(($grid) => {
      const width = $grid[0].offsetWidth;

      [0.1, 0.25, 0.5, 0.75].forEach((fraction) => {
        const by = -Math.round(width * fraction);
        dragBy('#calendar-gestures', by);

        cy.get('#calendar-gestures [data-vc="dates"]').then(($el) => {
          const moved = new DOMMatrix(getComputedStyle($el[0]).transform).m41;
          expect(Math.abs(moved - by), `content follows the finger at ${fraction * width}px`).to.be.lessThan(2);
        });

        cy.get('#calendar-gestures').trigger('pointercancel', { pointerId: 1, isPrimary: true, eventConstructor: 'PointerEvent', force: true });
        cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
      });
    });
  });

  it('commits to the next month when the drag is long enough', () => {
    visit();
    swipe('#calendar-gestures', -300);

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '4');
    cy.get('#calendar-gestures [data-vc="month"]').first().should('have.text', 'May');
  });

  it('commits to the previous month when dragged the other way', () => {
    visit();
    swipe('#calendar-gestures', 300);

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '2');
  });

  it('falls back when a placed drag stops short of the threshold', () => {
    visit();
    swipe('#calendar-gestures', -20);

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-gestures [data-vc-animating]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '3');
    cy.get('#calendar-gestures [data-vc-date]').should('have.length', 35);
  });

  it('eases a short placed drag back instead of rewinding its tiny timeline slice', () => {
    visit();
    dragBy('#calendar-gestures', -34);
    rest();

    let play: typeof Animation.prototype.play | null = null;
    cy.window().then((win) => {
      const originalPlay = win.Animation.prototype.play;
      play = originalPlay;
      win.Animation.prototype.play = function () {
        originalPlay.call(this);
        this.pause();
      };
    });
    release('#calendar-gestures', -34);

    cy.get('#calendar-gestures [data-vc="dates"]').then(($dates) => {
      const animation = $dates[0].getAnimations()[0];
      const timing = animation.effect!.getTiming();
      const frames = (animation.effect as KeyframeEffect).getKeyframes();

      expect(timing.duration).to.equal(200);
      expect(timing.easing).to.equal('cubic-bezier(0.4, 0, 0.2, 1)');
      expect(frames[0].transform).not.to.equal('none');
      expect(frames[1].transform).to.equal('none');
      animation.finish();
    });
    cy.window().then((win) => {
      if (play) win.Animation.prototype.play = play;
    });

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '3');
  });

  it('commits a placed drag of a couple of days, with no flick behind it', () => {
    visit();
    swipe('#calendar-gestures', -70);

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '4');
  });

  it('commits a short flick, which never reaches the threshold', () => {
    visit();
    flick('#calendar-gestures', -30);

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '4');
  });

  it('follows the direction a flick was thrown, not the ground it covered', () => {
    visit();
    dragBy('#calendar-gestures', -200);
    rest();
    surface('#calendar-gestures').then(($el) => {
      const box = $el[0].getBoundingClientRect();
      const x = Math.round(box.left + box.width / 2);
      const y = Math.round(box.top + box.height / 2);
      const options = { pointerId: 1, isPrimary: true, button: 0, eventConstructor: 'PointerEvent', force: true } as const;
      cy.wrap($el).trigger('pointermove', { ...options, clientX: x - 150, clientY: y });
      cy.wrap($el).trigger('pointermove', { ...options, clientX: x - 100, clientY: y });
      cy.wrap($el).trigger('pointerup', { ...options, clientX: x - 100, clientY: y });
    });

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '3');
  });

  it('leaves the vertical axis to the page', () => {
    visit();
    swipe('#calendar-gestures', 0, -200);

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '3');
  });

  it('does not select the date the finger was released over', () => {
    visit();
    cy.get('#calendar-gestures [data-vc-date-selected]').should('have.length', 1);
    swipe('#calendar-gestures', -300);

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-gestures [data-vc-date-selected]').should('not.exist');
  });

  it('moves every column of a multiple calendar together', () => {
    visit();
    dragBy('#calendar-multiple', -120);
    cy.get('#calendar-multiple [data-vc="content"] > [data-vc-ghost]').should('have.length', 2);
    release('#calendar-multiple', -300);

    cy.get('#calendar-multiple [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-multiple').should('equal', '4');
  });

  it('steps a week at a time once collapsed', () => {
    visit();
    cy.get('#calendar-collapsed [data-vc-date]').should('have.length', 7);
    swipe('#calendar-collapsed', -300);

    cy.get('#calendar-collapsed [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-collapsed [data-vc-date]')
      .then(($dates) => Cypress._.map($dates, (date: HTMLElement) => date.dataset.vcDate))
      .should('deep.equal', ['2023-04-24', '2023-04-25', '2023-04-26', '2023-04-27', '2023-04-28', '2023-04-29', '2023-04-30']);
  });

  it('survives a finish event that lands after the next gesture started', () => {
    visit();
    cy.get('#calendar-gestures [data-vc="content"]').then(($el) => {
      const el = $el[0];
      const box = el.getBoundingClientRect();
      const x = Math.round(box.left + box.width / 2);
      const y = Math.round(box.top + box.height / 2);

      raw(el, 'pointerdown', x, y);
      raw(el, 'pointermove', x - 12, y);
      raw(el, 'pointermove', x - 300, y);
      raw(el, 'pointerup', x - 300, y);

      el.getAnimations({ subtree: true }).forEach((animation) => animation.finish());
      raw(el, 'pointerdown', x, y);
      raw(el, 'pointermove', x - 12, y);
      raw(el, 'pointermove', x - 200, y);
    });

    assertClipped('#calendar-gestures');
  });

  it('keeps every ghost clipped through a burst of interrupted swipes', () => {
    visit();
    for (let n = 0; n < 5; n++) {
      dragBy('#calendar-gestures', -200);
      release('#calendar-gestures', -200);
      assertClipped('#calendar-gestures');
    }
    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-gestures [data-vc-clip]').should('not.exist');
  });

  it('cannot be scrolled sideways by focus while a swipe is running', () => {
    visit();
    dragBy('#calendar-gestures', -200);
    cy.get('#calendar-gestures [data-vc="content"]').then(($el) => {
      const content = $el[0];
      (content.querySelector('[data-vc="dates"] [data-vc-date-btn]') as HTMLElement).focus();
      expect(content.scrollLeft, 'clip container scrolled sideways').to.equal(0);
      expect(content.scrollTop, 'clip container scrolled vertically').to.equal(0);
    });
    release('#calendar-gestures', -200);
  });

  it('settles back when the pointer is taken away mid-drag', () => {
    visit();
    dragBy('#calendar-gestures', -150);
    cy.get('#calendar-gestures [data-vc-ghost]').should('exist');

    surface('#calendar-gestures').trigger('pointercancel', { pointerId: 1, isPrimary: true, eventConstructor: 'PointerEvent', force: true });

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-gestures [data-vc-clip]').should('not.exist');
    cy.get('#calendar-gestures [data-vc-animating]').should('not.exist');
    cy.get('#calendar-gestures').should('not.have.attr', 'data-vc-dragging');
    monthOf('#calendar-gestures').should('equal', '3');
  });

  it('recovers when a drag is left hanging and never released', () => {
    visit();
    dragBy('#calendar-gestures', -150);
    cy.get('#calendar-gestures [data-vc-ghost]').should('exist');

    cy.get('#calendar-gestures').trigger('lostpointercapture', { pointerId: 1, isPrimary: true, eventConstructor: 'PointerEvent', force: true });
    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');

    swipe('#calendar-gestures', -300);
    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '4');
  });

  it('ends the drag when the pointer is released far outside the calendar', () => {
    visit();
    dragBy('#calendar-gestures', -300);
    surface('#calendar-gestures').trigger('pointerup', {
      pointerId: 1,
      isPrimary: true,
      button: 0,
      eventConstructor: 'PointerEvent',
      force: true,
      clientX: -4000,
      clientY: -4000,
    });

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-gestures [data-vc-clip]').should('not.exist');
    cy.get('#calendar-gestures').should('not.have.attr', 'data-vc-dragging');
    monthOf('#calendar-gestures').should('equal', '4');
  });

  it('does not move two periods for one gesture', () => {
    visit();
    dragBy('#calendar-gestures', -300);
    release('#calendar-gestures', -300);
    release('#calendar-gestures', -300);

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-gestures').should('equal', '4');
  });

  it('keeps the header in step with the grid', () => {
    visit();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (const dx of [-300, -300, 300, -40, -300]) {
      swipe('#calendar-gestures', dx);
      cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
      cy.get('#calendar-gestures').then(($cal) => {
        const cal = $cal[0];
        const title = (cal.querySelector('[data-vc="month"]') as HTMLElement).innerText;
        const anchor = [...cal.querySelectorAll<HTMLElement>('[data-vc-date-month="current"]')][14].dataset.vcDate as string;
        expect(monthNames[Number(anchor.slice(5, 7)) - 1], `header matches the grid (${anchor})`).to.equal(title);
      });
    }
  });

  it('leaves no gesture state behind after a stray tap', () => {
    visit();
    surface('#calendar-gestures').trigger('pointerdown', { pointerId: 1, isPrimary: true, button: 0, eventConstructor: 'PointerEvent', force: true });
    surface('#calendar-gestures').trigger('pointerup', { pointerId: 1, isPrimary: true, button: 0, eventConstructor: 'PointerEvent', force: true });

    cy.get('#calendar-gestures [data-vc-ghost]').should('not.exist');
    cy.get('#calendar-gestures [data-vc-clip]').should('not.exist');
    cy.get('#calendar-gestures').should('not.have.attr', 'data-vc-dragging');

    cy.get('#calendar-gestures [data-vc-date="2023-04-05"] [data-vc-date-btn]').click();
    cy.get('#calendar-gestures [data-vc-date-selected]').should('have.attr', 'data-vc-date', '2023-04-05');
  });

  it('stops where the arrows stop', () => {
    visit();
    cy.get('#calendar-bounded [data-vc-arrow="next"]').should('not.be.visible');
    swipe('#calendar-bounded', -300);
    cy.get('#calendar-bounded [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-bounded').should('equal', '3');

    swipe('#calendar-bounded', 300);
    cy.get('#calendar-bounded [data-vc-ghost]').should('not.exist');
    monthOf('#calendar-bounded').should('equal', '2');
  });
});

export {};
