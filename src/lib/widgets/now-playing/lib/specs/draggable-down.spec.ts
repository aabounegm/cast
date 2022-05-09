import { fireEvent } from '@testing-library/svelte';
import { noop } from 'lodash-es';
import { draggableDown } from '../draggable-down';

const sampleThreshold = 100;

it('detects a completed swipe when it is longer than the threshold', () => {
  const node = document.createElement('div');
  node.setPointerCapture = noop;

  const onDragCompleted = jest.fn();
  const onDragFailed = jest.fn();

  draggableDown(node, { threshold: sampleThreshold, onDragCompleted, onDragFailed });
  fireEvent(node, new MouseEvent('pointerdown', { clientY: 0 }));
  fireEvent(node, new MouseEvent('pointerup', { clientY: sampleThreshold + 10 }));

  expect(onDragCompleted).toHaveBeenCalled();
  expect(onDragFailed).not.toHaveBeenCalled();
});

it('detects a failed swipe when it is shorter than the threshold', () => {
  const node = document.createElement('div');
  node.setPointerCapture = noop;

  const onDragCompleted = jest.fn();
  const onDragFailed = jest.fn();

  draggableDown(node, { threshold: sampleThreshold, onDragCompleted, onDragFailed });
  fireEvent(node, new MouseEvent('pointerdown', { clientY: 0 }));
  fireEvent(node, new MouseEvent('pointerup', { clientY: sampleThreshold - 10 }));

  expect(onDragFailed).toHaveBeenCalled();
  expect(onDragCompleted).not.toHaveBeenCalled();
});

it('allows to watch the current drag position', () => {
  const node = document.createElement('div');
  node.setPointerCapture = noop;

  const onDrag = jest.fn();

  const dragPositions = [0, 10, 20, 30, sampleThreshold];

  draggableDown(node, { threshold: sampleThreshold, onDrag });
  fireEvent(node, new MouseEvent('pointerdown', { clientY: dragPositions[0] }));
  for (const position of dragPositions) {
    fireEvent(node, new MouseEvent('pointermove', { clientY: position }));
  }
  fireEvent(node, new MouseEvent('pointerup', { clientY: dragPositions.at(-1) }));

  for (const [index, position] of dragPositions.entries()) {
    expect(onDrag).toHaveBeenNthCalledWith(index + 1, position);
  }
});
