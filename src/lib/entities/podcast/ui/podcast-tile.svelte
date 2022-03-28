<script lang="ts">
  import cx from 'clsx';
  import type { Podcast } from '$lib/shared/api';

  let _class = '';
  export { _class as class };
  export let large = false;
  export let podcast: Podcast;

  $: imageSize = large ? 108 : 32;
</script>

<a
  class={cx(
    'grid',
    'gap-x-4',
    'rounded-2xl',
    'items-center',
    'text-slate-100',
    'hover:bg-slate-700',
    'p-2',
    _class,
    large && 'large pb-3'
  )}
  href="/podcasts/{podcast.id}"
>
  <img
    class="rounded-lg aspect-square"
    width={imageSize}
    height={imageSize}
    class:row-span-2={!large}
    src={podcast.coverUrl}
    alt=""
  />
  <span class="author font-lato text-xs" class:mt-1={large}>
    {podcast.author}
  </span>
  <span class="title font-lato font-semibold text-sm">
    {podcast.title}
  </span>
</a>

<style>
  a {
    grid-template: auto auto / 2.25rem 1fr;
  }

  .large {
    grid-template: 6.75rem auto 1fr / 6.75rem;
  }

  span {
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }

  .large span {
    width: 6.75rem;
  }

  .large .author {
    margin-top: 0.5rem;
  }

  .large .title {
    -webkit-line-clamp: 2;
  }
</style>
