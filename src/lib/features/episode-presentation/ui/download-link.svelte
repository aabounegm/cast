<script lang="ts">
  import { DownloadLink } from '$lib/features/download-podcast';
  export let percentage: number | undefined = undefined;
  export let onClickDownload: (() => void) | undefined = undefined;
</script>

<span class="text-sm {$$props.class}">
  {#if !percentage}
    <DownloadLink on:click={onClickDownload} />
  {:else if percentage < 100}
    Downloading, {percentage}%
  {:else}
    <span class="text-green-400"> Available offline </span>
    <span class="text-green-400 material-icons-round !text-sm"> file_download_done </span>
  {/if}
</span>
