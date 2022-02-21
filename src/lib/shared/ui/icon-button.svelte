<script lang="ts">
  import clsx from 'clsx';
  import type { SvelteComponentTyped } from "svelte";

  let _class = '';
  export { _class as class };
  export let icon: SvelteComponentDev;
</script>

<button class={clsx('text-xl flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-600 active:bg-slate-500', _class)}>
  <svelte:component this={icon} />
</button>
