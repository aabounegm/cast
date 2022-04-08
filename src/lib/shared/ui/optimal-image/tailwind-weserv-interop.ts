const width = /\bw-([0-9]+)\b/;
const height = /\bh-([0-9]+)\b/;

interface ImageDimensions {
  width: number | undefined;
  height: number | undefined;
}

export function parseTailwindSize(classes: string) {
  const dimensions: ImageDimensions = { width: undefined, height: undefined };
  const tailwindWidth = width.exec(classes)?.at(1);
  const tailwindHeight = height.exec(classes)?.at(1);

  if (tailwindWidth !== undefined) {
    dimensions.width = parseInt(tailwindWidth, 10) * 4;
  }
  if (tailwindHeight !== undefined) {
    dimensions.height = parseInt(tailwindHeight, 10) * 4;
  }

  return dimensions;
}

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
