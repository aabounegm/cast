<script lang="ts">
  import {
    parseTailwindSize,
    serveAtPixelDensities,
    getWeservUrl,
  } from './tailwind-weserv-interop';

  let _class = '';
  export { _class as class };
  export let src: string;
  export let alt: string;

  $: dimensions = parseTailwindSize(_class);
</script>

<picture class={_class}>
  <source srcset={serveAtPixelDensities(src, dimensions, [1, 2], 'webp')} type="image/webp" />
  <img
    src={getWeservUrl(src, dimensions)}
    srcset={serveAtPixelDensities(src, dimensions, [1, 2])}
    {alt}
    {...dimensions}
    loading="lazy"
    decoding="async"
    {...$$restProps}
  />
</picture>
