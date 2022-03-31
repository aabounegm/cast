import SignOutButton from '../sign-out-button.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

jest.mock('../../model/sign-out', () => ({
  signOut: jest.fn(),
}));

import { signOut } from '../../model/sign-out';

it('calls the signOut function on click', async () => {
  const user = userEvent.setup();
  render(SignOutButton);
  await user.click(screen.getByRole('button', { name: 'Sign out' }));
  expect(signOut).toHaveBeenCalled();
});
