import { parseLayout } from '@scripts/utils/parseComponent';
import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';
export const parseMultipleLayout = (self: Calendar, template: string): string => {
  return template
    .replace(/<#Multiple>(.*?)<#\/Multiple>/gs, (_, content) => {
      const repeatedContent = Array(self.context.displayMonthsCount).fill(content).join('');
      return self.sanitizerHTML(repeatedContent);
    })
    .replace(/[\n\t]/g, '');
};

const render = (self: Calendar, target?: HTMLElement) => {
  if (self.context.currentType === 'multiple') {
    getExtensions(self).time?.destroy(self);
    self.context.mainElement.innerHTML = self.sanitizerHTML(parseMultipleLayout(self, parseLayout(self, self.layouts.multiple)));
    return true;
  }
  if (self.type !== 'multiple' || !target) return false;
  const controlsEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="controls"]');
  const gridEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="grid"]');
  const columnEl = target.closest<HTMLElement>('[data-vc="column"]');
  if (controlsEl) controlsEl.remove();
  if (gridEl) gridEl.dataset.vcGrid = 'hidden';
  if (columnEl) columnEl.dataset.vcColumn = self.context.currentType;
  if (columnEl) columnEl.innerHTML = self.sanitizerHTML(parseLayout(self, self.layouts[self.context.currentType]));
  return true;
};
export default render;
