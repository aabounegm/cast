import svelte from 'svelte-inline-compile';
import { LoginButton } from '../../../auth';
import { useLocalVars } from '../../../../shared/lib/jest-hacks';
import { render } from '@testing-library/svelte';

it('renders the button', async () => {
  const loginButton = useLocalVars(svelte`<LoginButton />`, [LoginButton]);

  const { getByRole } = render(loginButton);
  expect(getByRole('button', { name: 'Sign in with GitHub' })).toBeInTheDocument();
});
