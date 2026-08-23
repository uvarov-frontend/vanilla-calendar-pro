const VELOCITY_WINDOW_MS = 170;
type Point = { x: number; y: number; time: number };

const pointOf = (event: PointerEvent): Point => ({ x: event.clientX, y: event.clientY, time: event.timeStamp });

export type DragTracker = ReturnType<typeof createDragTracker>;

const createDragTracker = (event: PointerEvent) => {
  const origin = pointOf(event);
  let start = origin;
  let last = origin;

  return {
    origin,

    move: (moveEvent: PointerEvent) => {
      last = pointOf(moveEvent);
      if (last.time - start.time > VELOCITY_WINDOW_MS) start = last;
    },

    velocity: (upEvent: PointerEvent, vertical: boolean) => {
      const elapsed = last.time - start.time;
      if (!elapsed || upEvent.timeStamp - last.time > VELOCITY_WINDOW_MS) return 0;
      return (vertical ? last.y - start.y : last.x - start.x) / elapsed;
    },
  };
};

export default createDragTracker;
