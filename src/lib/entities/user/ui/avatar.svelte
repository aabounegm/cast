<script lang="ts">
  import { Image } from '$lib/shared/ui';
  export let image: string | undefined;

  const emptyImage = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
</script>

{#if image === undefined}
  <img class="aspect-square h-12 w-12 rounded-full overflow-hidden block" src={emptyImage} alt="" />
{:else}
  <Image class="aspect-square h-12 w-12 rounded-full overflow-hidden block" src={image} alt="" />
{/if}
