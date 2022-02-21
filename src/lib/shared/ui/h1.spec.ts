import svelte from 'svelte-inline-compile';
import { render } from '@testing-library/svelte';

import { H1 } from '.';
import { useLocalVars } from '../lib/jest-hacks';

it('renders the text that was passed to it', () => {
  const sampleContent = 'sample content';

  const h1WithContent = useLocalVars(svelte`<H1>{sampleContent}</H1>`, [H1, sampleContent]);
  const { getByText } = render(h1WithContent);

  expect(getByText(sampleContent)).toBeInTheDocument();
});
