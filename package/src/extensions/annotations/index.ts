import type { AnnotationsExtension, CalendarExtension } from '@src/extension';
import createDatePopup, { cleanupDatePopups } from './create';
import hover from './hover';
import tooltip from './renderTooltip';
import component from './Tooltip';

/** Date popup content, modifiers and range tooltips. */
export const annotations: CalendarExtension = /* @__PURE__ */ Object.freeze({
  name: 'annotations',
  component,
  tooltip,
  hover,
  prepare(self, count) {
    cleanupDatePopups(self);
    if (!self.popups || !Object.keys(self.popups).length) return;
    // Share local-date checkpoints across months, only for this render.
    const cursors = count > 1 ? new Map<string, number>() : undefined;
    return (dates) => createDatePopup(self, dates, cursors);
  },
  destroy: cleanupDatePopups,
} satisfies AnnotationsExtension) as unknown as CalendarExtension;
