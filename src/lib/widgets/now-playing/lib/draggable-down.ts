export interface DraggableDownParameters {
  threshold: number;
  onDrag?: (dragAmount: number) => void;
  onDragFailed?: () => void;
  onDragCompleted?: () => void;
}

export function draggableDown(element: HTMLElement, parameters: DraggableDownParameters) {
  let dragStartY: number | undefined = undefined;

  function startTrackingDrag(event: PointerEvent) {
    event.preventDefault();
    dragStartY = event.clientY;
    element.setPointerCapture(event.pointerId);
    element.addEventListener('pointermove', watchDrag);
    element.addEventListener('pointerup', checkDragAgainstThreshold);
  }

  function watchDrag(event: PointerEvent) {
    if (dragStartY !== undefined) {
      event.preventDefault();
      parameters.onDrag?.(event.clientY - dragStartY);
    }
  }

  function checkDragAgainstThreshold(event: PointerEvent) {
    if (dragStartY !== undefined) {
      const yDiff = dragStartY - event.clientY;

      if (-yDiff > parameters.threshold) {
        parameters.onDragCompleted?.();
      } else {
        parameters.onDragFailed?.();
      }
      dragStartY = undefined;
    }
    element.removeEventListener('pointermove', watchDrag);
    element.removeEventListener('pointerup', checkDragAgainstThreshold);
  }

  element.addEventListener('pointerdown', startTrackingDrag);

  return {
    destroy() {
      element.removeEventListener('pointerdown', startTrackingDrag);
    },
  };
}
