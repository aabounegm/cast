import svelte from 'svelte-inline-compile';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { createEvent } from '@testing-library/dom';
import { noop } from 'lodash-es';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import SwipeDownBar from '../ui/swipe-down-bar.svelte';

it('closes on the swipe', async () => {
  const mockCloseHandler = jest.fn();

  const swipeDownBar = useLocalVars(svelte`<SwipeDownBar on:minimize={mockCloseHandler} />`, [
    SwipeDownBar,
    mockCloseHandler,
  ]);
  render(swipeDownBar);

  /**
   * This logic is a mix of Testing Library `createEvent` function and an article
   * https://www.freecodecamp.org/news/how-to-write-better-tests-for-drag-and-drop-operations-in-the-browser-f9a131f0b281/.
   *
   * Basically, it is a normal practice to test drag-and-drop (or pointerdown and pointermove) features
   * by firings proper events with corresponding data (in this case, clientY property), but Testing
   * Library's `createEvent` cannot assign the properties to Event entity. That's why the `Object.assign` is used.
   */
  fireEvent(
    screen.getByRole('button'),
    Object.assign(
      createEvent('pointerdown', screen.getByRole('button'), {
        target: {
          setPointerCapture: noop,
        },
      }),
      {
        clientX: 1,
        clientY: 1,
        pointerId: '123',
      }
    )
  );

  fireEvent(
    screen.getByRole('button'),
    Object.assign(createEvent('pointermove', screen.getByRole('button')), {
      clientX: 1,
      clientY: 62,
    })
  );

  expect(mockCloseHandler).toHaveBeenCalled();
});

it("doesn't close on small (<60px) swipe", async () => {
  const mockCloseHandler = jest.fn();

  const swipeDownBar = useLocalVars(svelte`<SwipeDownBar on:minimize={mockCloseHandler} />`, [
    SwipeDownBar,
    mockCloseHandler,
  ]);
  render(swipeDownBar);

  fireEvent(
    screen.getByRole('button'),
    Object.assign(
      createEvent('pointerdown', screen.getByRole('button'), {
        target: {
          setPointerCapture: noop,
        },
      }),
      {
        clientX: 1,
        clientY: 1,
        pointerId: '123',
      }
    )
  );

  fireEvent(
    screen.getByRole('button'),
    Object.assign(createEvent('pointermove', screen.getByRole('button')), {
      clientX: 1,
      clientY: 52,
    })
  );

  expect(mockCloseHandler).not.toHaveBeenCalled();
});
