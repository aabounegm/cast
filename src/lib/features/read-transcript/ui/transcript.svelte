<script lang="ts">
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import { getTranscript } from '$lib/entities/episode';
  import type { Episode } from '$lib/shared/api';
  import SkeletonTranscript from './skeleton-transcript.svelte';

  let _class = '';
  export { _class as class };
  export let episode: Episode;

  let content: Promise<string | undefined> | undefined = undefined;

  async function loadTranscript(episodeID: Episode['id']) {
    const rawMarkdown = await getTranscript(episodeID);
    if (rawMarkdown !== undefined) {
      return marked(rawMarkdown);
    } else {
      return undefined;
    }
  }

  onMount(() => {
    content = loadTranscript(episode.id);
  });
</script>

<div class={clsx('overflow-y-auto h-full', _class)}>
  {#if content === undefined}
    <SkeletonTranscript lines={15} />
  {:else}
    {#await content}
      <SkeletonTranscript lines={15} />
    {:then contentHTML}
      <div class={clsx('overflow-y-auto h-full', _class)}>
        {#if contentHTML !== undefined}
          {@html contentHTML}
        {:else}
          The transcript for this episode is not available yet.
        {/if}
      </div>
    {:catch}
      <div class={clsx('overflow-y-auto h-full', _class)}>
        Couldn't fetch the transcript, try refreshing the page.
      </div>
    {/await}
  {/if}
</div>
