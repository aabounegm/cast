import { render, screen } from '@testing-library/svelte';

import { Image } from '../optimal-image';

const sampleSource = 'https://placekitten.com/100/100';
const sampleAltText = 'A kitten.';

it('extracts width and height from Tailwind classes and sets them as HTML properties', () => {
  render(Image, {
    src: sampleSource,
    alt: sampleAltText,
    class: 'w-5 h-6',
  });

  const imgNode = screen.getByRole('img');
  expect(imgNode).toHaveAttribute('width', '20');
  expect(imgNode).toHaveAttribute('height', '24');
});

it('renders a WebP source from images.weserv.nl with pixel densities 1 and 2', () => {
  const { container } = render(Image, {
    src: sampleSource,
    alt: sampleAltText,
    class: 'w-5',
  });
  const sourceNode = container.querySelector('source');
  expect(sourceNode).toHaveAttribute('type', 'image/webp');
  const srcset = sourceNode?.getAttribute('srcset');
  expect(srcset).toContain('images.weserv.nl');
  expect(srcset).toContain(`url=${encodeURIComponent(sampleSource)}`);
  expect(srcset).toContain('output=webp');
  expect(srcset).toContain('w=20');
  expect(srcset).toContain('1x');
  expect(srcset).toContain('w=40');
  expect(srcset).toContain('2x');
});

it('configures lazy-loading and asynchronous decoding', () => {
  render(Image, {
    src: sampleSource,
    alt: sampleAltText,
  });
  const imgNode = screen.getByRole('img');
  expect(imgNode).toHaveAttribute('loading', 'lazy');
  expect(imgNode).toHaveAttribute('decoding', 'async');
});

it('renders the alt-text correctly', () => {
  render(Image, { src: sampleSource, alt: sampleAltText });
  screen.getByRole('img', { name: sampleAltText });
});
