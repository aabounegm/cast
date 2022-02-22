<script lang="ts">
  import clsx from 'clsx';
  import type { SvelteComponent } from 'svelte';

  let _class = '';
  export { _class as class };
  export let href = '';
  export let icon: typeof SvelteComponent;

  $: classes = clsx(
    'text-xl flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-600 active:bg-slate-500',
    _class
  );
</script>

{#if href}
  <a {href} class={classes}>
    <svelte:component this={icon} />
  </a>
{:else}
  <button class={classes} on:click>
    <svelte:component this={icon} />
  </button>
{/if}
