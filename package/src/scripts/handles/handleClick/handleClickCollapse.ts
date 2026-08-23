import buildCollapse from '@scripts/handles/handleGestures/collapseTransition';
import type { Calendar } from '@src/index';

const handleClickCollapse = (self: Calendar, event: MouseEvent) => {
  if (!self.enableCollapse || !(event.target as HTMLElement).closest('[data-vc="collapse"]')) return;

  const transition = buildCollapse(self);
  transition.settle(transition.from === 0);
};

export default handleClickCollapse;
