import svelte from 'svelte-inline-compile';
import { fireEvent, render } from '@testing-library/svelte';
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
  const { getByRole } = render(swipeDownBar);

  /**
   * This logic is a mix of Testing Library `createEvent` function and an article
   * https://www.freecodecamp.org/news/how-to-write-better-tests-for-drag-and-drop-operations-in-the-browser-f9a131f0b281/.
   *
   * Basically, it is a normal practice to test drag-and-drop (or pointerdown and pointermove) features
   * by firings proper events with corresponding data (in this case, clientY property), but Testing
   * Library's `createEvent` cannot assign the properties to Event entity. That's why the `Object.assign` is used.
   */
  fireEvent(
    getByRole('button'),
    Object.assign(
      createEvent('pointerdown', getByRole('button'), {
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
    getByRole('button'),
    Object.assign(createEvent('pointermove', getByRole('button')), {
      clientX: 1,
      clientY: 102,
    })
  );

  expect(mockCloseHandler).toHaveBeenCalled();
});

it("doesn't close on small (<100px) swipe", async () => {
  const mockCloseHandler = jest.fn();

  const swipeDownBar = useLocalVars(svelte`<SwipeDownBar on:minimize={mockCloseHandler} />`, [
    SwipeDownBar,
    mockCloseHandler,
  ]);
  const { getByRole } = render(swipeDownBar);

  fireEvent(
    getByRole('button'),
    Object.assign(
      createEvent('pointerdown', getByRole('button'), {
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
    getByRole('button'),
    Object.assign(createEvent('pointermove', getByRole('button')), {
      clientX: 1,
      clientY: 52,
    })
  );

  expect(mockCloseHandler).not.toHaveBeenCalled();
});
