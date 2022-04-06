<script lang="ts">
  import clsx from 'clsx';
  import type { SvelteComponent } from 'svelte';

  let _class = '';
  export { _class as class };
  export let icon: typeof SvelteComponent;
  export let iconClass = '';
  export let name: string;

  $: classes = clsx(
    'flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-600 active:bg-slate-500',
    _class
  );
</script>

<button class={classes} on:click {...$$restProps} title={name}>
  <svelte:component this={icon} class={iconClass} />
  <span class="sr-only">{name}</span>
</button>
