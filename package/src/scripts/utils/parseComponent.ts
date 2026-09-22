import { getComponent } from '@scripts/components';
import type { Calendar } from '@src/index';

export const parseLayout = (self: Calendar, template: string): string => {
  return template
    .replace(/[\n\t]/g, '')
    .replace(/<#(?!\/?Multiple)(.*?)>/g, (_, tagContent) => {
      const type = (tagContent.match(/\[(.*?)\]/) || [])[1];
      const componentName = tagContent.replace(/[/\s\n\t]|\[(.*?)\]/g, '');
      const component = getComponent(self, componentName);
      const htmlContent = component ? component(self, type ?? null) : '';
      return self.sanitizerHTML(htmlContent);
    })
    .replace(/[\n\t]/g, '');
};
