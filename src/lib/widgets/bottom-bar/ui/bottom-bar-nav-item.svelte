<script lang="ts">
  import { page } from '$app/stores';
  import clsx from 'clsx';
  import type { SvelteComponent } from 'svelte';

  let _class = '';
  export { _class as class };
  export let href: string;
  export let showLabel = false;
  export let icon: typeof SvelteComponent;
  export let name: string;

  $: classes = clsx(
    'text-sm rounded-full font-extrabold flex items-center justify-center hover:bg-slate-600 active:bg-slate-500',
    showLabel ? 'px-5 py-3' : 'px-3 py-3',
    _class,
    $page.url.pathname === href && 'text-indigo-300'
  );
</script>

<a {href} class={classes} {...$$restProps} title={name}>
  <svelte:component this={icon} class="w-6 h-6" />
  <span class:sr-only={!showLabel} class="ml-2">{name}</span>
</a>
