import { arrow, calendar, day, hour, minute, range, selected, swipeLeft, visitExample } from '../support/calendar';

const singleSelection = () => {
  day('2024-06-20').click();
  selected(['2024-06-20']);
  day('2024-06-21').click();
  selected(['2024-06-21']);
};
const monthPicker = () => {
  cy.get('[data-vc-months-month]').should('have.length', 12);
  cy.get('[data-vc-months-month="7"]').click().should('have.attr', 'data-vc-months-month-selected');
  cy.get('[data-vc-months-month-selected]').should('have.length', 1);
};
const yearPicker = () => {
  cy.get('[data-vc-years-year]').should('have.length', 15);
  cy.get('[data-vc-years-year="2025"]').click().should('have.attr', 'data-vc-years-year-selected');
  cy.get('[data-vc-years-year-selected]').should('have.length', 1);
};
const openInput = () => {
  cy.get('#calendar').should('have.attr', 'aria-haspopup', 'dialog').click();
  cy.get('[data-vc-input]').should('be.visible').and('not.have.attr', 'data-vc-calendar-hidden');
};
const week = () => {
  cy.get('[data-vc-date]').should('have.length', 7).first().should('have.attr', 'data-vc-date', '2024-06-17');
  selected(['2024-06-19']);
  arrow('next').click();
  cy.get('[data-vc-ghost]').should('not.exist');
  cy.get('[data-vc-date]').should('have.length', 7).first().should('have.attr', 'data-vc-date', '2024-06-24');
  day('2024-06-26').click();
  selected(['2024-06-26']);
};
const animation = (duration: number, easing: string) => {
  cy.window().then((win) => {
    const original = win.Element.prototype.animate;
    win.Element.prototype.animate = function (...args) {
      const animation = original.apply(this, args);
      animation.pause();
      return animation;
    };
  });
  arrow('next').click();
  cy.get('[data-vc-ghost]').should('exist');
  cy.document().should((document) => {
    const timings = document.getAnimations().map((animation) => animation.effect?.getTiming());
    expect(timings.some((timing) => timing?.duration === duration && timing.easing === easing)).to.equal(true);
  });
  cy.document().then((document) => document.getAnimations().forEach((animation) => animation.finish()));
  cy.get('[data-vc-ghost]').should('not.exist');
  cy.get('[data-vc="month"]').should('have.attr', 'data-vc-month', '6');
};
const editTime = () => {
  hour().clear().type('03').blur();
  minute().clear().type('45').blur();
  hour().should('have.value', '03');
  minute().should('have.value', '45');
};

// Each real example must have assertions for its documented behavior. The inventory test
// below fails when an example is added or renamed without a corresponding scenario.
const scenarios: Record<string, () => void> = {
  'installation-and-usage': singleSelection,
  'type-default': singleSelection,
  'type-default-in-input': () => {
    openInput();
    day('2024-06-20').click();
    cy.get('#calendar').should('have.value', '2024-06-20');
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-calendar-hidden');
    cy.get('#calendar').click();
    selected(['2024-06-20']);
  },
  'type-month': monthPicker,
  'type-year': yearPicker,
  'type-multiple': () => {
    cy.get('[data-vc="month"]').should('have.length', 2);
    day('2024-06-20').click();
    day('2024-07-03').click();
    selected(['2024-06-20', '2024-07-03']);
    day('2024-06-20').click();
    selected(['2024-07-03']);
    arrow('next').click();
    cy.get('[data-vc="month"]').first().should('have.attr', 'data-vc-month', '6');
  },
  'type-multiple-ranged': () => {
    cy.get('[data-vc="month"]').should('have.length', 2);
    day('2024-06-18').should('be.disabled');
    cy.get('[data-vc-date-month="prev"] [data-vc-date-btn]').should('not.exist');
    day('2024-06-29').click();
    day('2024-07-02').click();
    selected(['2024-06-29', '2024-06-30', '2024-07-01', '2024-07-02']);
    arrow('next').click();
    cy.get('[data-vc="month"]').first().should('have.attr', 'data-vc-month', '7');
  },
  'type-week': week,
  'type-week-in-input': () => {
    openInput();
    week();
    cy.get('#calendar').should('have.value', '2024-06-26');
    cy.get('#outside').click();
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-calendar-hidden');
  },
  'date-management-date-min-and-max': () => {
    visitExample('date-management-date-min-and-max', new Date(2038, 11, 15, 12).getTime());
    arrow('next').should('not.be.visible');
    day('2038-12-31').click();
    selected(['2038-12-31']);
    visitExample('date-management-date-min-and-max', new Date(1920, 0, 15, 12).getTime());
    arrow('prev').should('not.be.visible');
    day('1920-01-01').should('not.be.disabled');
  },
  'date-management-display-range-dates': () => {
    visitExample('date-management-display-range-dates', new Date(2024, 11, 15, 12).getTime());
    arrow('next').should('not.be.visible');
    day('2024-12-31').click();
    selected(['2024-12-31']);
    cy.get('[data-vc-date="2025-01-01"] [data-vc-date-btn]').should('be.disabled');
  },
  'date-management-disable-dates': () => {
    for (const date of ['10', '11', '12', '13', '22']) day(`2022-08-${date}`).should('be.disabled');
    selected([]);
    day('2022-08-14').click();
    selected(['2022-08-14']);
  },
  'date-management-enable-dates': () => {
    cy.get('[data-vc-date-month="current"] [data-vc-date-btn]:enabled').should('have.length', 5);
    day('2022-08-14').should('be.disabled');
    selected([]);
    day('2022-08-22').click();
    selected(['2022-08-22']);
  },
  'date-management-forbid-choice': () => {
    cy.get('[data-vc="month"]').should('be.disabled');
    cy.get('[data-vc="year"]').should('be.disabled');
    day('2024-06-20').click();
    selected([]);
    arrow('next').should('not.be.visible');
    arrow('prev').should('not.be.visible');
  },
  'date-management-other-today': () => {
    cy.get('[data-vc-date-today]').should('have.attr', 'data-vc-date', '2022-01-07');
    day('2022-01-08').click();
    selected(['2022-01-08']);
    cy.get('[data-vc-date-today]').should('have.attr', 'data-vc-date', '2022-01-07');
  },
  'date-management-selected-days-month-year': () => {
    selected(['2022-01-09', '2022-01-10', '2022-01-11', '2022-01-12', '2022-01-13', '2022-01-22']);
    day('2022-01-10').click();
    selected(['2022-01-09', '2022-01-11', '2022-01-12', '2022-01-13', '2022-01-22']);
  },
  'date-management-enable-time-picker-12': () => {
    range('hour').invoke('val', '15').trigger('input');
    editTime();
    cy.get('[data-vc-time="keeping"]').should('have.text', 'PM').click().should('have.text', 'AM');
    range('hour').should(($range) => expect(($range[0] as HTMLInputElement).valueAsNumber).to.equal(3));
  },
  'date-management-enable-time-picker-24': () => {
    cy.get('[data-vc-time="keeping"]').should('not.exist');
    hour().clear().type('23').blur().should('have.value', '23');
    range('hour').should('have.value', '23');
    minute().clear().type('59').blur().should('have.value', '59');
  },
  'date-management-enable-time-picker-your-time': () => {
    hour().should('have.value', '03');
    minute().should('have.value', '44');
    cy.get('[data-vc-time="keeping"]').should('have.text', 'AM').click().should('have.text', 'PM');
    range('hour').should('have.value', '15');
  },
  'date-management-enable-time-picker-control': () => {
    hour().should('be.disabled');
    minute().should('be.disabled');
    cy.get('[data-vc-time="keeping"]').should('be.disabled');
    range('hour').should('have.attr', 'step', '5').invoke('val', '15').trigger('input');
    hour().should('have.value', '03');
    cy.get('[data-vc-time="keeping"]').should('have.text', 'PM');
    range('minute').should('have.attr', 'step', '5').invoke('val', '35').trigger('input');
    minute().should('have.value', '35');
  },
  'date-management-enable-time-picker-range': () => {
    range('hour').should('have.attr', 'min', '6').and('have.attr', 'max', '21');
    range('minute').should('have.attr', 'min', '10').and('have.attr', 'max', '40');
    hour().should('have.value', '06').clear().type('05').blur().should('have.value', '06');
    minute().should('have.value', '10').clear().type('41').blur().should('have.value', '10');
    range('hour').invoke('val', '21').trigger('input');
    hour().should('have.value', '09');
    cy.get('[data-vc-time="keeping"]').should('have.text', 'PM');
  },
  'internationalization-locale': () => {
    cy.get('[data-vc="month"]').should('have.text', 'Juni');
    cy.get('[data-vc-week-day]').first().should('have.text', 'Mo');
    day('2024-06-20').should('have.attr', 'aria-label', '20. Juni 2024').click();
    selected(['2024-06-20']);
    arrow('next').click();
    cy.get('[data-vc="month"]').should('have.text', 'Juli');
  },
  'internationalization-assign-manually': () => {
    cy.get('[data-vc="month"]').should('have.text', 'Njordmánuðr');
    cy.get('[data-vc-week-day]').first().should('have.text', 'Mani');
    cy.get('[data-vc="month"]').click();
    cy.get('[data-vc-months-month="6"]').should('have.text', 'Tyr').click();
    cy.get('[data-vc="month"]').should('have.text', 'Tyrmánuðr');
  },
  'internationalization-week-numbers': () => {
    cy.get('[data-vc-week-number]').should('have.length', 5).first().should('have.attr', 'data-vc-week-number', '22');
    arrow('next').click();
    cy.get('[data-vc-week-number]').first().should('have.attr', 'data-vc-week-number', '27');
  },
  'internationalization-weekday-first-and-weekdays': () => {
    cy.get('[data-vc-week-day]').first().should('have.attr', 'data-vc-week-day', '0');
    for (const date of ['2024-06-19', '2024-06-22', '2024-06-23']) day(date).parent().should('have.attr', 'data-vc-date-weekend');
    day('2024-06-20').parent().should('not.have.attr', 'data-vc-date-weekend');
  },
  'internationalization-weekends-and-holidays': () => {
    cy.get('[data-vc-date-holiday][data-vc-date-month="current"]').should('have.length', 7);
    day('2022-01-10').parent().should('have.attr', 'data-vc-date-holiday');
    day('2022-01-11').parent().should('not.have.attr', 'data-vc-date-holiday');
    day('2022-01-10').click();
    selected(['2022-01-10']);
  },
  'handle-click-a-day': () => {
    day('2024-06-20').click();
    cy.get('@log').should('have.been.calledOnceWithExactly', ['2024-06-20']);
    selected(['2024-06-20']);
  },
  'handle-click-a-day-ranged': () => {
    day('2024-06-20').click();
    day('2024-06-23').click();
    selected(['2024-06-20', '2024-06-21', '2024-06-22', '2024-06-23']);
    cy.get('@log').should('have.been.calledWithExactly', ['2024-06-20', '2024-06-23']);
  },
  'handle-click-on-a-month-in-the-month-selection': () => {
    monthPicker();
    cy.get('@log').should('have.been.calledOnceWithExactly', 7);
  },
  'handle-click-on-the-year-in-the-year-selection': () => {
    yearPicker();
    cy.get('@log').should('have.been.calledOnceWithExactly', 2025);
  },
  'handle-click-on-the-arrows': () => {
    arrow('next').click();
    cy.get('@log').should('have.been.calledOnceWithExactly', 2024, 6);
    arrow('prev').click();
    cy.get('@log').should('have.been.calledWithExactly', 2024, 5);
  },
  'handle-click-on-weekday': () => {
    cy.get('[data-vc-week-day="1"] button').click();
    selected(['2024-06-03', '2024-06-10', '2024-06-17', '2024-06-24']);
  },
  'handle-click-on-the-week-number': () => {
    cy.get('[data-vc-week-number="25"]').click();
    selected(['2024-06-17', '2024-06-18', '2024-06-19', '2024-06-20', '2024-06-21', '2024-06-22', '2024-06-23']);
  },
  'handle-get-and-change-every-day': () => {
    day('2024-06-20').find('span').should('have.length', 2).last().should('have.text', '$325');
    day('2024-06-20').find('span').last().click();
    selected(['2024-06-20']);
    arrow('next').click();
    day('2024-07-20').find('span').last().should('have.text', '$325');
  },
  'handle-select-and-change-of-time': () => {
    range('hour').invoke('val', '13').trigger('input');
    minute().clear().type('25').blur();
    cy.get('@log').should('have.been.calledWithExactly', '01:25 PM');
  },
  'additional-features-animation': () => animation(250, 'cubic-bezier(0.4, 0, 0.2, 1)'),
  'additional-features-animation-shared': () => animation(400, 'cubic-bezier(0.4, 0, 0.2, 1)'),
  'additional-features-animation-custom': () => animation(700, 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'),
  'additional-features-collapse': () => {
    selected(['2024-06-19']);
    cy.get('[data-vc="collapse"]').click();
    cy.get('[data-vc="collapse"]').should('have.attr', 'aria-expanded', 'false');
    cy.get('[data-vc-ghost]').should('not.exist');
    calendar().should('have.attr', 'data-vc-type', 'week');
    cy.get('[data-vc-date]').should('have.length', 7);
    cy.get('[data-vc="collapse"]').click();
    calendar().should('have.attr', 'data-vc-type', 'default');
    cy.get('[data-vc-ghost]').should('not.exist');
    selected(['2024-06-19']);
  },
  'additional-features-swipe': () => {
    calendar().should('have.attr', 'data-vc-swipe');
    swipeLeft();
    cy.get('[data-vc="month"]').should('have.attr', 'data-vc-month', '6');
    day('2024-07-20').click();
    selected(['2024-07-20']);
  },
  'additional-features-layouts': () => {
    cy.get('[data-vc-header="content"]').children().first().should('have.attr', 'data-vc', 'year');
    cy.contains('button', 'I am a button').should('be.visible');
    singleSelection();
    arrow('next').click();
    cy.contains('button', 'I am a button').should('be.visible');
  },
  'additional-features-layouts-btn-close': () => {
    openInput();
    day('2024-06-20').click();
    cy.get('#calendar').should('have.value', '2024-06-20');
    cy.get('#btn-close').click();
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-calendar-hidden');
    cy.get('#calendar').click();
    selected(['2024-06-20']);
    cy.get('#btn-close').click();
    cy.get('[data-vc-input]').should('have.attr', 'data-vc-calendar-hidden');
  },
  'additional-features-popups': () => {
    day('2024-07-03').should('have.class', 'bg-sponsor').and('have.attr', 'aria-label').and('include', 'Support the project');
    cy.get('[data-vc-date="2024-07-03"] [data-vc-date-popup] a').should('have.attr', 'href', 'https://buymeacoffee.com/uvarov');
    day('2024-07-03').focus();
    cy.get('[data-vc-date-popup]').should('be.visible');
    day('2024-07-04').focus();
    cy.get('[data-vc-date-popup]').should('not.be.visible');
  },
  'additional-features-tooltips': () => {
    day('2024-06-20').click();
    day('2024-06-23').trigger('mousemove');
    cy.get('[data-vc-date-range-tooltip="visible"]').should('contain.text', 'Start:').and('contain.text', '2024-06-20');
    day('2024-06-23').parent().should('have.attr', 'data-vc-date-hover', 'last');
    day('2024-06-23').click();
    selected(['2024-06-20', '2024-06-21', '2024-06-22', '2024-06-23']);
  },
  'additional-features-styles': () => {
    arrow('prev').should('have.class', 'arrow-smile').click();
    cy.get('[data-vc="month"]').should('have.attr', 'data-vc-month', '4');
  },
  'additional-features-themes-light': () => {
    calendar().should('have.attr', 'data-vc-theme', 'light').and('have.css', 'background-color', 'rgb(255, 255, 255)');
    singleSelection();
  },
  'additional-features-themes-dark': () => {
    calendar().should('have.attr', 'data-vc-theme', 'dark').and('have.css', 'background-color', 'rgb(15, 23, 42)');
    singleSelection();
  },
  'additional-features-themes-slate-light': () => {
    calendar().should('have.attr', 'data-vc-theme', 'slate-light').and('have.css', 'background-color', 'rgb(241, 245, 249)');
    singleSelection();
  },
};

describe('Published examples against the packed library', () => {
  it('covers every example in the repository', () => {
    cy.request<string[]>('/examples.json').its('body').should('deep.equal', Object.keys(scenarios).sort());
  });
  for (const [name, scenario] of Object.entries(scenarios)) {
    it(name, () => {
      visitExample(name, name === 'date-management-disable-dates' ? new Date(2022, 7, 15, 12).getTime() : undefined);
      scenario();
    });
  }
});
