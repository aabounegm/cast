import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { SnackbarQueue, snackbar, type SnackbarOptions } from '../snackbar';

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

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

it('adds a snackbar to the queue and displays it', () => {
  snackbar(firstSnackbar);
  render(SnackbarQueue);
  expect(screen.getByText(firstSnackbar.text)).toBeInTheDocument();
});

it('adds two snackbars to the queue, but only one is displayed', () => {
  snackbar(firstSnackbar);
  snackbar(secondSnackbar);
  render(SnackbarQueue);
  expect(screen.getByText(firstSnackbar.text)).toBeInTheDocument();
  expect(screen.queryByText(secondSnackbar.text)).not.toBeInTheDocument();
});

it('removes snackbar from the queue after pressing the button and fires the callback', async () => {
  const user = userEvent.setup({ delay: null });
  snackbar(firstSnackbar);
  render(SnackbarQueue);

  expect(screen.getByText(firstSnackbar.text)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: firstSnackbar.buttonText }));
  expect(screen.queryByText(firstSnackbar.text)).not.toBeInTheDocument();

  expect(firstSnackbar.callback).toHaveBeenCalled();
});

it('disappears after 4 seconds of being on the screen', () => {
  snackbar(firstSnackbar);
  jest.advanceTimersByTime(4000);
  render(SnackbarQueue);
  expect(screen.queryByText(firstSnackbar.text)).not.toBeInTheDocument();
});
