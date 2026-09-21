import type { Calendar, Options } from '@src/index';

type Component = (self: Calendar) => string;

/** @internal Fixed integration points for the built-in extensions. */
export type MotionExtension = Readonly<{
  name: 'motion';
  component: Component;
  bind: (self: Calendar) => void;
  reset: (self: Calendar) => void;
  destroy: (self: Calendar) => void;
  click: (self: Calendar, event: MouseEvent) => void;
  navigate: (self: Calendar, selector: string, route: 'prev' | 'next', render: () => void) => void;
  changeView: (self: Calendar, column: number, render: () => void) => void;
}>;

/** @internal */
export type TimePickerExtension = Readonly<{
  name: 'timePicker';
  component: Component;
  init: (self: Calendar) => void;
  render: (self: Calendar) => void;
  destroy: (self: Calendar) => void;
}>;

/** @internal */
export type DatePopupsExtension = Readonly<{
  name: 'datePopups';
  prepare: (self: Calendar, count: number) => ((dates: HTMLElement) => void) | undefined;
  destroy: (self: Calendar) => void;
}>;

declare const extensionBrand: unique symbol;
/** An immutable built-in extension. Register it once in the constructor options. */
export type CalendarExtension = Readonly<{
  name: 'motion' | 'timePicker' | 'datePopups';
  [extensionBrand]: true;
}>;
type Implementation = MotionExtension | TimePickerExtension | DatePopupsExtension;

type Extensions = { motion?: MotionExtension; timePicker?: TimePickerExtension; datePopups?: DatePopupsExtension };
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
    if (name !== 'motion' && name !== 'timePicker' && name !== 'datePopups') throw new Error('Unknown calendar extension.');
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
  requireExtension(
    options.animation || options.enableSwipe || options.enableCollapse,
    'motion',
    options.animation ? 'animation' : options.enableSwipe ? 'enableSwipe' : 'enableCollapse',
  );
  requireExtension(options.selectionTimeMode, 'timePicker', 'selectionTimeMode');
  requireExtension(options.popups && Object.keys(options.popups).length, 'datePopups', 'popups');
};
