const widthPattern = /\bw-([0-9]+)\b/;
const heightPattern = /\bh-([0-9]+)\b/;

interface ImageDimensions {
  width: number | undefined;
  height: number | undefined;
}

/** Extract `'w-*'` and `'h-*'` Tailwind classes from a class string and convert to pixels. */
export function parseTailwindSize(classes: string) {
  const dimensions: ImageDimensions = { width: undefined, height: undefined };
  const tailwindWidth = widthPattern.exec(classes)?.at(1);
  const tailwindHeight = heightPattern.exec(classes)?.at(1);

  if (tailwindWidth !== undefined) {
    dimensions.width = parseInt(tailwindWidth, 10) * 4;
  }
  if (tailwindHeight !== undefined) {
    dimensions.height = parseInt(tailwindHeight, 10) * 4;
  }

  return dimensions;
}

/**
 * Construct an image URL proxied through `images.weserv.nl`
 *
 * See https://images.weserv.nl for documentation.
 */
export function getWeservUrl(url: string, dimensions: ImageDimensions, format?: string) {
  const weservUrl = new URL('https://images.weserv.nl');
  weservUrl.searchParams.set('url', url);

  if (dimensions.width !== undefined) {
    weservUrl.searchParams.set('w', dimensions.width.toString());
  }
  if (dimensions.height !== undefined) {
    weservUrl.searchParams.set('h', dimensions.height.toString());
  }
  if (format !== undefined) {
    weservUrl.searchParams.set('output', format);
  }

  return weservUrl.toString();
}

function scale(dimensions: ImageDimensions, factor: number) {
  return {
    width: dimensions.width === undefined ? undefined : dimensions.width * factor,
    height: dimensions.height === undefined ? undefined : dimensions.height * factor,
  };
}

/**
 * Create a `srcset`-suitable string by generating URLs to images for multiple pixel densities.
 *
 * For example, for densities `[1, 2]` it will generate the following string:
 * ```
 * '<original-img> 1x, <double-res-img> 2x'
 * ```
 *
 * Image scaling is done through https://images.weserv.nl.
 */
export function serveAtPixelDensities(
  src: string,
  dimensions: ImageDimensions,
  densities: number[],
  format?: string
) {
  if (dimensions.width === undefined && dimensions.height === undefined) {
    return getWeservUrl(src, dimensions, format);
  }

  return densities
    .map((density) => `${getWeservUrl(src, scale(dimensions, density), format)} ${density}x`)
    .join(', ');
}
