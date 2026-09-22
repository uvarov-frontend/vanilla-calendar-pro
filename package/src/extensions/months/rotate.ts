import type { RenderState } from '@scripts/utils/renderState';
import type { Calendar } from '@src/index';

// Rotate only outgoing columns. Retained months stay attached to their original
// parents, preserving their layout and avoiding style work for every date cell.
const rotateColumns = (self: Calendar, reuse: RenderState) => {
  const shift = self.context.selectedYear * 12 + self.context.selectedMonth - reuse.month;
  if (!shift || Math.abs(shift) >= reuse.count) return;
  const columns = Array.from(self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="column"]'));
  const parent = columns[0]?.parentElement;
  if (!parent || columns.length !== reuse.count || columns.some((column) => column.parentElement !== parent)) return;
  if (
    Array.from(parent.childNodes).some((node) =>
      node.nodeType === 1 ? !columns.includes(node as HTMLElement) : node.nodeType !== 3 || !!node.textContent?.trim(),
    )
  )
    return;
  const indices: number[] = [];
  if (shift > 0) {
    const after = columns[columns.length - 1].nextSibling;
    for (let index = 0; index < shift; index++) {
      const space = columns[index].nextSibling;
      if (space?.nodeType === 3 && space !== after) parent.insertBefore(space, after);
      parent.insertBefore(columns[index], after);
      indices.push(reuse.count - shift + index);
    }
  } else {
    for (let index = reuse.count + shift; index < reuse.count; index++) {
      const space = columns[index].previousSibling;
      parent.insertBefore(columns[index], columns[0]);
      if (space?.nodeType === 3) parent.insertBefore(space, columns[0]);
      indices.push(index - reuse.count - shift);
    }
  }
  return indices;
};

export default rotateColumns;
