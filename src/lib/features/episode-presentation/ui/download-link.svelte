<script lang="ts">
  export let percentage: number | undefined = undefined;
  export let onClickDownload: (() => void) | undefined = undefined;
</script>

<span class="text-sm {$$props.class}">
  {#if !percentage}
    <span class="a" on:click={onClickDownload}>
      <slot>Download</slot>
    </span>
  {:else if percentage < 100}
    Downloading, {percentage}%
  {:else}
    <span class="text-green-400"> Available offline </span>
    <span class="text-green-400 material-icons-round !text-sm"> file_download_done </span>
  {/if}
</span>
