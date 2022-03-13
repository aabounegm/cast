import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { SnackbarQueue, snackbar, type SnackbarOptions } from '..';

const firstSnackbar: SnackbarOptions = {
  text: 'Hello',
  buttonText: 'Close',
  callback: jest.fn(),
};

const secondSnackbar: SnackbarOptions = {
  text: 'Example',
  buttonText: 'Close',
  callback: jest.fn(),
};

it('adds a snackbar to the queue and displays it', () => {
  snackbar(firstSnackbar);
  const { getByText } = render(SnackbarQueue);
  expect(getByText(firstSnackbar.text)).toBeInTheDocument();
});

it('adds two snackbars to the queue, but only one is displayed', () => {
  snackbar(firstSnackbar);
  snackbar(secondSnackbar);
  const { queryByText } = render(SnackbarQueue);
  expect(queryByText(firstSnackbar.text)).toBeInTheDocument();
  expect(queryByText(secondSnackbar.text)).not.toBeInTheDocument();
});

it('removes snackbar from the queue after pressing the button and fires the callback', async () => {
  const user = userEvent.setup();
  snackbar(firstSnackbar);
  const { getByRole, queryByText } = render(SnackbarQueue);

  expect(queryByText(firstSnackbar.text)).toBeInTheDocument();
  await user.click(getByRole('button', { name: firstSnackbar.buttonText }));
  expect(queryByText(firstSnackbar.text)).not.toBeInTheDocument();

  expect(firstSnackbar.callback).toHaveBeenCalled();
});

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

it('disappears after 4 seconds of being on the screen', () => {
  snackbar(firstSnackbar);
  jest.advanceTimersByTime(4000);
  const { queryByText } = render(SnackbarQueue);
  expect(queryByText(firstSnackbar.text)).not.toBeInTheDocument();
});
