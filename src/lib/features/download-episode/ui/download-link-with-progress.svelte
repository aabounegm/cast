<script lang="ts">
  import { derived, readable } from 'svelte/store';
  import DownloadDone from './download-done.svelte';
  import DownloadLink from './download-link.svelte';
  import DownloadProgress from './download-progress.svelte';
  import { startEpisodeDownload } from '../lib/download';

  export let urls: string[];
  export let downloadAll = false;

  let progress = readable<number | null>(null);

  $: {
    if (!downloadAll && urls.length !== 1)
      console.error('Expected 1 URL for downloading a single episode');
  }

  function startDownloads() {
    progress = derived(
      urls.map(startEpisodeDownload),
      (downloads) => {
        const sum = downloads.reduce((partialSum, a) => partialSum + a, 0);
        return Math.floor(sum / downloads.length);
      },
      0
    );
  }
</script>

{#if $progress === null}
  <DownloadLink on:click={startDownloads} {downloadAll} />
{:else if $progress < 100}
  <DownloadProgress percentage={$progress} />
{:else}
  <DownloadDone />
{/if}
