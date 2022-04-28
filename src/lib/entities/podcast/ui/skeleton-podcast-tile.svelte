<script lang="ts">
  import cx from 'clsx';

  let _class = '';
  export { _class as class };
  export let large = false;
</script>

<div
  class={cx(
    'grid',
    'gap-x-4',
    'rounded-2xl',
    'items-center',
    'motion-safe:animate-pulse',
    'p-2',
    _class,
    large && 'large pb-3'
  )}
>
  <div
    class={cx(
      'rounded-lg',
      'bg-slate-400',
      'overflow-hidden',
      large ? 'w-27 h-27' : 'w-8 h-8',
      !large && 'row-span-2'
    )}
  />
  <span class="sr-only">Podcast is loading</span>
  <div class="author bg-slate-400 rounded h-4 w-16" class:mt-1={large} />
  <div class="title bg-slate-400 rounded h-4 w-27 mt-1" />
</div>

<style>
  .w-27 {
    width: 6.75rem;
  }

  .h-27 {
    height: 6.75rem;
  }

  .large {
    grid-template: 6.75rem auto 1fr / 6.75rem;
  }

  .large .author {
    margin-top: 0.5rem;
  }
</style>
