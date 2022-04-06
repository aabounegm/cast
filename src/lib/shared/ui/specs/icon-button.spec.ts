import svelte from 'svelte-inline-compile';
import { render, screen } from '@testing-library/svelte';

import { IconButton } from '..';
import { useLocalVars } from '$lib/shared/lib/jest-hacks';

it('has an accessible name', () => {
  const sampleName = 'do stuff';

  const sampleIcon = svelte`
    <script>
      let _class;
      export { _class as class };
    </script>

    <div />
  `;
  const iconButtonWithName = useLocalVars(
    svelte`<IconButton icon={sampleIcon} name={sampleName} />`,
    [IconButton, sampleIcon, sampleName]
  );
  render(iconButtonWithName);

  expect(screen.getByRole('button', { name: sampleName })).toBeInTheDocument();
});
