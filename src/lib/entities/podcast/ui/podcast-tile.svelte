<script lang="ts">
  import { uid } from 'uid';
  import cx from 'clsx';
  import { Image } from '$lib/shared/ui';
  import type { Podcast } from '$lib/shared/api';
  import { onMount } from 'svelte';

  let _class = '';
  export { _class as class };
  export let large = false;
  export let podcast: Podcast;

  let loading = 'lazy';
  let aEl: HTMLAnchorElement;

  const id = uid();

  onMount(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(function (entries) {
      if (entries.length === 0) return;
      if (entries.some((entry) => entry.isIntersecting)) {
        loading = 'eager';
      }
      observer.disconnect();
    });
    observer.observe(aEl);
  });
</script>

<article
  aria-labelledby="podcast-{podcast.id}-title-{id}"
  aria-describedby="podcast-{podcast.id}-author-{id}"
  {...$$restProps}
>
  <a
    href="/podcasts/{podcast.id}"
    bind:this={aEl}
    aria-labelledby="podcast-{podcast.id}-title-{id}"
    aria-describedby="podcast-{podcast.id}-author-{id}"
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
  >
    <Image
      class={cx(
        'rounded-lg',
        'aspect-square',
        'overflow-hidden',
        large ? 'w-27 h-27' : 'w-8 h-8',
        !large && 'row-span-2'
      )}
      src={podcast.coverUrl}
      alt=""
      {loading}
    />
    <span
      class="author font-lato text-xs"
      class:mt-1={large}
      id="podcast-{podcast.id}-author-{id}"
      aria-label="Author: {podcast.author}"
    >
      {podcast.author}
    </span>
    <span class="title font-lato font-semibold text-sm" id="podcast-{podcast.id}-title-{id}">
      {podcast.title}
    </span>
  </a>
</article>

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
