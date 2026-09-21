import type { Calendar } from '../../package/src';
import type * as Utils from '../../package/src/utils';
import { arrow, day, fixedToday, hour, selected } from '../support/calendar';

type ScriptWindow = Window & { Calendar: typeof Calendar; calendarUtils: typeof Utils; instance: Calendar };
const api = () => cy.window().then((win) => win as unknown as ScriptWindow);

describe('Classic script distribution without a module loader', () => {
  beforeEach(() => {
    cy.clock(fixedToday, ['Date']);
    cy.visit('/api-script.html');
    cy.window().its('Calendar').should('be.a', 'function');
  });

  it('creates, navigates, selects a range and destroys a calendar using browser globals', () => {
    api().then((win) => {
      win.instance = new win.Calendar('#calendar', { selectionDatesMode: 'multiple-ranged', enableEdgeDatesOnly: false });
      win.instance.init();
    });
    arrow('next').click();
    day('2024-07-20').click();
    day('2024-07-22').click();
    selected(['2024-07-20', '2024-07-21', '2024-07-22']);
    api().then((win) => {
      expect(win.instance.context.selectedDates).to.deep.equal(['2024-07-20', '2024-07-21', '2024-07-22']);
      win.instance.destroy();
    });
    cy.get('#calendar').should('be.empty').and('not.have.attr', 'data-vc');
  });

  it('updates an input with the selected date/time through the documented callback', () => {
    api().then((win) => {
      win.instance = new win.Calendar('#input', {
        inputMode: true,
        selectionTimeMode: 24,
        selectedTime: '09:15',
        onChangeToInput(self) {
          self.context.inputElement!.value = `${self.context.selectedDates[0] ?? ''} ${self.context.selectedTime}`;
        },
      });
      win.instance.init();
    });
    cy.get('#input').click();
    day('2024-06-20').click();
    cy.get('#input').should('have.value', '2024-06-20 09:15');
    hour().clear().type('18').blur();
    cy.get('#input').should('have.value', '2024-06-20 18:15');
    cy.get('#outside').click();
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-calendar-hidden');
  });

  it('exposes working date utilities independently of the Calendar class', () => {
    api().then(({ calendarUtils: utils }) => {
      expect(utils.getDateString(utils.getDate('2024-02-29'))).to.equal('2024-02-29');
      expect(utils.parseDates(['2024-02-28:2024-03-01'])).to.deep.equal(['2024-02-28', '2024-02-29', '2024-03-01']);
      expect(utils.getWeekNumber('2021-01-01', 1)).to.deep.equal({ year: 2020, week: 53 });
    });
  });
});
