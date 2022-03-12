import SignInButton from '../sign-in-button.svelte';
import { render } from '@testing-library/svelte';

it('renders the button', async () => {
  const { getByRole } = render(SignInButton);
  expect(getByRole('button', { name: 'Sign in with GitHub' })).toBeInTheDocument();
});
