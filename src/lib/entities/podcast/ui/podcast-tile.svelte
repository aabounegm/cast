<script lang="ts">
  import cx from 'clsx';
  import type { Podcast } from '$lib/shared/api';
  import { send, receive } from '$lib/shared/ui/animation';

  let _class = '';
  export { _class as class };
  export let large = false;
  export let podcast: Podcast;
</script>

<a
  class={cx('grid', 'gap-x-4', 'text-slate-100', _class, large && 'large p-2')}
  href="/podcasts/{podcast.id}"
>
  <img
    class="rounded-lg aspect-square"
    class:row-span-2={!large}
    src={podcast.coverUrl}
    alt=""
    in:receive={{ key: podcast.id }}
    out:send={{ key: podcast.id }}
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
    grid-template: 6.75rem auto 1fr / auto;
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

  .large .title {
    -webkit-line-clamp: 2;
  }
</style>
