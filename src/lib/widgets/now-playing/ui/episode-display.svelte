<script lang="ts">
  import { getPodcastByID } from '$lib/entities/podcast';
  import { Image } from '$lib/shared/ui';
  import type { Episode } from '$lib/shared/api';

  export let episode: Episode;
  $: podcast = getPodcastByID(episode.podcastID);
</script>

{#if podcast !== undefined}
  <Image
    class="now-playing-cover-art rounded-2xl overflow-hidden flex-grow"
    src={podcast.coverUrl}
    alt=""
  />

  <div class="flex pt-6 font-raleway text-lg text-center leading-6 font-extrabold text-slate-100">
    {episode.title}
  </div>

  <div class="pt-2 font-lato text-xs text-center leading-4 text-slate-100 ">
    {podcast.author} &mdash; {podcast.title}
  </div>
{/if}

<style>
  :global(.now-playing-cover-art) {
    height: 11rem;
    width: 11rem;
  }

  @media (min-height: 44rem) {
    :global(.now-playing-cover-art) {
      height: 14rem;
      width: 14rem;
    }
  }

  @media (min-height: 50rem) {
    :global(.now-playing-cover-art) {
      height: unset;
      width: unset;
    }
  }

  @media (min-width: 40rem) {
    :global(.now-playing-cover-art) {
      max-width: 30rem;
    }
  }
</style>
