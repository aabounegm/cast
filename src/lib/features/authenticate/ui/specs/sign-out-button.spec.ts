import SignOutButton from '../sign-out-button.svelte';
import { render } from '@testing-library/svelte';

it('renders the button', async () => {
  const { getByRole } = render(SignOutButton);
  expect(getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
});
