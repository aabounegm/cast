import svelte from 'svelte-inline-compile';
import { render } from '@testing-library/svelte';

import { IconButton } from '..';
import { useLocalVars } from '$lib/shared/lib/jest-hacks';

it('has an accessible name', () => {
  const sampleName = 'do stuff';

  const sampleIcon = svelte`<div />`;
  const iconButtonWithName = useLocalVars(
    svelte`<IconButton icon={sampleIcon} name={sampleName} />`,
    [IconButton, sampleIcon, sampleName]
  );
  const { getByRole } = render(iconButtonWithName);

  expect(getByRole('button', { name: sampleName })).toBeInTheDocument();
});
