import { writable, get } from 'svelte/store';
import type { SnackbarOptions } from './types';

/**
 * The queue of different snackbars. It works like this:
 *
 * • First comes served – the first snackbar stays on the screen for 4 seconds
 * • Next snackbar waits in the queue for its turn
 * • Snackbar timing can be prolonged – if the time of the first snackbar in the queue
 * didn't pass but the call for this type of snackbar fired again, timeout resets
 * to 4 seconds
 * • Pressing on the Snackbar's action removes it from the queue
 */
export const snackbarQueue = writable<SnackbarOptions[]>([]);

const SNACKBAR_TIMEOUT = 4000;
let timeout: ReturnType<typeof setTimeout>;

// TODO: экспортировать фильтр и сделать обертку для каждого колбека

export const filterQueueByText = (text: string) => {
  snackbarQueue.update((queue) => {
    return queue.filter((snack) => snack.text !== text);
  });
};

const setSnackbarTime = (options: SnackbarOptions) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    filterQueueByText(options.text);
    const queue = get(snackbarQueue);
    if (queue.length) {
      setSnackbarTime(queue[0]);
    }
  }, SNACKBAR_TIMEOUT);
};

export const snackbar = (options: SnackbarOptions) => {
  snackbarQueue.update((queue) => {
    if (!queue.length || queue[0]?.text === options.text) {
      setSnackbarTime(options);
    }

    if (queue[0]?.text === options.text) return queue;
    return [...queue, options];
  });
};
