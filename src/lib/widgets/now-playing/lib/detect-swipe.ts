const PIXEL_THRESHOLD = 100;

type SwipeCallbacks = Partial<Record<'left' | 'right' | 'up' | 'down', () => void>>;

export const detectSwipe = (callbacks: SwipeCallbacks) => {
  let xStart: number | null = null;
  let yStart: number | null = null;
  let dragging = false;

  const handlePointerStart = (evt: PointerEvent) => {
    evt.preventDefault();
    dragging = true;
    xStart = evt.clientX;
    yStart = evt.clientY;
    (evt.target as HTMLDivElement).setPointerCapture(evt.pointerId);
    return false;
  };

  const handlePointerUp = (evt: PointerEvent) => {
    evt.preventDefault();
    dragging = false;
    xStart = null;
    yStart = null;
  };

  const handlePointerMove = (evt: PointerEvent) => {
    evt.preventDefault();
    if (!xStart || !yStart || !dragging) {
      return;
    }

    const xUp = evt.clientX;
    const yUp = evt.clientY;
    const xDiff = xStart - xUp;
    const yDiff = yStart - yUp;

    if (Math.abs(xDiff) + Math.abs(yDiff) > PIXEL_THRESHOLD) {
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          callbacks.left?.();
        } else {
          callbacks.right?.();
        }
      } else {
        if (yDiff > 0) {
          callbacks.up?.();
        } else {
          callbacks.down?.();
        }
      }

      xStart = null;
      yStart = null;
      dragging = false;
      return;
    }

    return { xDiff, yDiff };
  };

  return {
    handlePointerStart,
    handlePointerUp,
    handlePointerMove,
  };
};
