import type { CalendarExtension, DatePopupsExtension } from '@src/extension';
import createDatePopup, { cleanupDatePopups } from './create';

/** Date popup content and modifiers, including date ranges. */
export const datePopups: CalendarExtension = /* @__PURE__ */ Object.freeze({
  name: 'datePopups',
  prepare(self, count) {
    cleanupDatePopups(self);
    if (!self.popups || !Object.keys(self.popups).length) return;
    // Share local-date checkpoints across months, only for this render.
    const cursors = count > 1 ? new Map<string, number>() : undefined;
    return (dates) => createDatePopup(self, dates, cursors);
  },
  destroy: cleanupDatePopups,
} satisfies DatePopupsExtension) as unknown as CalendarExtension;
