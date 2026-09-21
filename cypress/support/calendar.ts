import { syntheticPointerCapture } from './pointerCapture';

export const fixedToday = new Date(2024, 5, 19, 12).getTime();
export const calendar = () => cy.get('[data-vc="calendar"]');
export const day = (date: string) => cy.get(`[data-vc-date="${date}"][data-vc-date-month="current"] [data-vc-date-btn]`).first();
export const arrow = (direction: 'prev' | 'next') => cy.get(`[data-vc-arrow="${direction}"]`).first();
export const hour = () => cy.get('[data-vc-time-input="hour"] input');
export const minute = () => cy.get('[data-vc-time-input="minute"] input');
export const range = (unit: 'hour' | 'minute') => cy.get(`[data-vc-time-range="${unit}"] input`);
export const selected = (dates: string[]) =>
  calendar().should(($calendar) => {
    const values = [...$calendar[0].querySelectorAll<HTMLElement>('[data-vc-date-selected][data-vc-date-month="current"]')].map((el) => el.dataset.vcDate);
    expect([...new Set(values)].sort()).to.deep.equal(dates);
  });

export function visitExample(name: string, today = fixedToday) {
  cy.clock().then((clock) => clock.restore());
  cy.clock(today, ['Date']);
  cy.visit(`/examples/${name}.html`, {
    onBeforeLoad(win) {
      if (name === 'additional-features-swipe') syntheticPointerCapture(win);
      cy.spy(win.console, 'log').as('log');
      cy.stub(win.Math, 'random').returns(0.25);
    },
  });
  cy.window().its('exampleReady').should('equal', true);
}

export function swipeLeft() {
  cy.get('[data-vc="content"]')
    .first()
    .then(($el) => {
      const box = $el[0].getBoundingClientRect();
      const event = { eventConstructor: 'PointerEvent', pointerId: 1, pointerType: 'touch', isPrimary: true, buttons: 1, clientY: box.top + 80 };
      cy.wrap($el)
        .trigger('pointerdown', { ...event, clientX: box.right - 20 })
        .trigger('pointermove', { ...event, clientX: box.left + 20 })
        .trigger('pointerup', { ...event, clientX: box.left + 20, buttons: 0 });
    });
  cy.get('[data-vc-ghost]').should('not.exist');
}
