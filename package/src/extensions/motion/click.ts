import buildCollapse from '@src/extensions/motion/gestures/collapseTransition';
import type { Calendar } from '@src/index';

const handleClickCollapse = (self: Calendar, event: MouseEvent) => {
  if (!self.enableCollapse || !['default', 'week'].includes(self.context.currentType) || !(event.target as HTMLElement).closest('[data-vc="collapse"]')) return;

  const transition = buildCollapse(self);
  if (!transition) return;
  transition.settle(transition.from === 0);
};

export default handleClickCollapse;
