import svelte from 'svelte-inline-compile';
import { render, screen } from '@testing-library/svelte';

import { H1 } from '..';
import { useLocalVars } from '$lib/shared/lib/jest-hacks';

it('renders the text that was passed to it', () => {
  const sampleContent = 'sample content';

  const h1WithContent = useLocalVars(svelte`<H1>{sampleContent}</H1>`, [H1, sampleContent]);
  render(h1WithContent);

  expect(screen.getByText(sampleContent)).toBeInTheDocument();
});

it('passes a custom class and other props to the DOM node', () => {
  const sampleContent = 'sample content';
  const sampleClass = 'class';
  const sampleID = 'id';

  const h1WithContent = useLocalVars(
    svelte`<H1 class={sampleClass} id={sampleID}>{sampleContent}</H1>`,
    [H1, sampleClass, sampleID, sampleContent]
  );
  render(h1WithContent);

  const h1Node = screen.getByRole('heading');
  expect(h1Node).toHaveAttribute('id', sampleID);
  expect(h1Node).toHaveClass(sampleClass);
});
