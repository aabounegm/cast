<script lang="ts">
  export let downloadAll = false;
</script>

<button
  class="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 cursor-pointer"
  on:click
>
  Download
  {#if downloadAll}
    all
  {/if}
</button>
