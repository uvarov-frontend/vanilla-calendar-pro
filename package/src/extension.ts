import type { Calendar, FormatDateString, Options } from '@src/index';

export type RenderState = {
  observer: MutationObserver;
  dirty: boolean;
  fullLayout: boolean;
  options: string;
  context: string;
  structure: string;
  timezone: string;
  month: number;
  count: number;
};

export type Transition = {
  distance: number;
  from: number;
  track: () => void;
  seek: (progress: number) => void;
  settle: (toEnd: boolean) => void;
};

type Component = (self: Calendar) => string;

/** @internal Fixed integration points for the built-in extensions. */
export type MotionExtension = Readonly<{
  name: 'motion';
  collapse: (self: Calendar) => Transition | null;
  bind: (self: Calendar) => void;
  reset: (self: Calendar) => void;
  destroy: (self: Calendar) => void;
  navigate: (self: Calendar, selector: string, route: 'prev' | 'next', render: () => void) => void;
  changeView: (self: Calendar, column: number, render: () => void) => void;
}>;

/** @internal */
export type TimeExtension = Readonly<{
  name: 'time';
  component: Component;
  init: (self: Calendar) => void;
  render: (self: Calendar) => void;
  destroy: (self: Calendar) => void;
}>;

/** @internal */
export type AnnotationsExtension = Readonly<{
  name: 'annotations';
  component: Component;
  tooltip: (self: Calendar, tooltip: HTMLElement | null, date: HTMLElement | null) => void;
  hover: (self: Calendar, target: HTMLElement | null) => void;
  prepare: (self: Calendar, count: number) => ((dates: HTMLElement) => void) | undefined;
  destroy: (self: Calendar) => void;
}>;

/** @internal */
export type WeeksExtension = Readonly<{
  name: 'weeks';
  weekday: (self: Calendar) => ((cell: HTMLElement, title: string, label: string) => void) | undefined;
  component: Component;
  numbersComponent: Component;
  layout: Component;
  init: (self: Calendar) => void;
  dates: (self: Calendar, dates: HTMLElement) => void;
  numbers: (self: Calendar, first: number, days: number, numbers: HTMLElement, dates: HTMLElement) => void;
  date: (self: Calendar, date: HTMLElement, value: FormatDateString) => void;
  shift: (self: Calendar, route: 'prev' | 'next') => void;
  arrows: (self: Calendar, previous: HTMLElement, next: HTMLElement) => void;
  click: (self: Calendar, event: MouseEvent) => void;
  collapseClick: (self: Calendar, event: MouseEvent) => void;
  prepareCollapse: (self: Calendar) => {
    datesEl: HTMLElement;
    rows: HTMLElement[];
    targetRow: HTMLElement;
    wasCollapsed: boolean;
    finish: (toWeek: boolean) => void;
  } | null;
}>;

/** @internal */
export type MonthsExtension = Readonly<{
  name: 'months';
  layout: Component;
  render: (self: Calendar, target?: HTMLElement) => boolean;
  column: (self: Calendar, type: string) => { currentValue: number | null; columnID: number };
  select: (self: Calendar, type: 'month' | 'year', item: HTMLElement) => void;
  rotate: (self: Calendar, reuse: RenderState) => number[] | undefined;
}>;

type Extensions = { motion?: MotionExtension; time?: TimeExtension; annotations?: AnnotationsExtension; weeks?: WeeksExtension; months?: MonthsExtension };
declare const extensionBrand: unique symbol;
/** An immutable built-in extension. Register it once in the constructor options. */
export type CalendarExtension = Readonly<{
  name: keyof Extensions;
  [extensionBrand]: true;
}>;
type Implementation = NonNullable<Extensions[keyof Extensions]>;
const names = ['motion', 'time', 'annotations', 'weeks', 'months'];
const registered = new WeakMap<Calendar, Extensions>();
const empty: Extensions = {};
export const noExtensions: readonly CalendarExtension[] = /* @__PURE__ */ Object.freeze([]);

export const getExtensions = (self: Calendar): Extensions => registered.get(self) ?? empty;

export const registerExtensions = (self: Calendar) => {
  if (!self.extensions.length) return;
  const extensions: Extensions = {};
  for (const descriptor of self.extensions) {
    const extension = descriptor as unknown as Implementation;
    const name = extension.name;
    if (!names.includes(name)) throw new Error('Unknown calendar extension.');
    if (extensions[name] && extensions[name] !== extension) throw new Error(`Conflicting calendar extension: ${name}.`);
    Object.assign(extensions, { [name]: extension });
  }
  registered.set(self, extensions);
};

// Validate before mutating options or DOM, including input calendars before their first opening.
export const validateExtensions = (self: Calendar, options: Options = self) => {
  if (
    options.extensions &&
    options.extensions !== self.extensions &&
    (new Set(options.extensions).size !== self.extensions.length || options.extensions.some((item) => !self.extensions.includes(item)))
  )
    throw new Error('Calendar extensions are fixed at construction. Create a new Calendar to change them.');
  const extensions = getExtensions(self);
  const requireExtension = (enabled: unknown, name: keyof Extensions, option: string) => {
    if (enabled && !extensions[name])
      throw new Error(`The "${option}" option requires ${name}. Import { ${name} } from 'vanilla-calendar-pro' and add it to extensions: [${name}].`);
  };
  requireExtension(options.animation || options.enableSwipe, 'motion', options.animation ? 'animation' : 'enableSwipe');
  requireExtension(options.selectionTimeMode, 'time', 'selectionTimeMode');
  requireExtension(
    (options.popups && Object.keys(options.popups).length) || options.onCreateDateRangeTooltip,
    'annotations',
    options.onCreateDateRangeTooltip ? 'onCreateDateRangeTooltip' : 'popups',
  );
  requireExtension(options.type === 'multiple', 'months', 'type');
  requireExtension(
    options.type === 'week' || options.enableCollapse || options.enableWeekNumbers || options.onClickWeekDay,
    'weeks',
    options.type === 'week' ? 'type' : options.enableCollapse ? 'enableCollapse' : options.enableWeekNumbers ? 'enableWeekNumbers' : 'onClickWeekDay',
  );
};
