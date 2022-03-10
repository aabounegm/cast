<script lang="ts">
  import { page } from '$app/stores';
  import clsx from 'clsx';
  import type { SvelteComponent } from 'svelte';

  let _class = '';
  export { _class as class };
  export let href: string;
  export let showLabel = false;
  export let icon: typeof SvelteComponent;
  export let iconClass = '';
  export let name: string;

  $: classes = clsx(
    'text-s flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-600 active:bg-slate-500',
    _class,
    $page.url.pathname === href && 'text-indigo-300'
  );
</script>

<a {href} class={classes} {...$$restProps} title={name}>
  <svelte:component this={icon} class={iconClass} />
  <span class:sr-only={!showLabel} class="ml-2">{name}</span>
</a>
