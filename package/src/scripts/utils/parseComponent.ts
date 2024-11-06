import { getComponent } from '@scripts/components';
import type { VanillaCalendarPro } from '@src/index';

export const parseLayout = (self: VanillaCalendarPro, template: string): string => {
  return template
    .replace(/[\n\t]/g, '')
    .replace(/<#(?!\/?Multiple)(.*?)>/g, (_, tagContent) => {
      const type = (tagContent.match(/\[(.*?)\]/) || [])[1];
      const componentName = tagContent.replace(/[/\s\n\t]|\[(.*?)\]/g, '');
      const component = getComponent(componentName);
      const htmlContent = component ? component(self, type ?? null) : '';
      return self.sanitizerHTML(htmlContent);
    })
    .replace(/[\n\t]/g, '');
};

export const parseMultipleLayout = (self: VanillaCalendarPro, template: string): string => {
  return template
    .replace(/<#Multiple>(.*?)<#\/Multiple>/gs, (_, content) => {
      const repeatedContent = Array(self.context.displayMonthsCount).fill(content).join('');
      return self.sanitizerHTML(repeatedContent);
    })
    .replace(/[\n\t]/g, '');
};
