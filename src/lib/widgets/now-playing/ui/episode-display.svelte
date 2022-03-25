<script lang="ts">
  import { getPodcastByID } from '$lib/entities/podcast';
  import type { Episode } from '$lib/shared/api';

  export let episode: Episode;
  $: podcast = getPodcastByID(episode.podcastID);
</script>

{#if podcast !== undefined}
  <img class="rounded-2xl flex-grow" src={podcast.coverUrl} alt="" />

  <div class="flex pt-6 font-raleway text-lg text-center leading-6 font-extrabold text-slate-100">
    {episode.title}
  </div>

  <div class="pt-2 font-lato text-xs text-center leading-4 text-slate-100 ">
    {podcast.author} &mdash; {podcast.title}
  </div>
{/if}

<style>
  img {
    height: 11rem;
    width: 11rem;
  }

  @media (min-height: 44rem) {
    img {
      height: 14rem;
      width: 14rem;
    }
  }

  @media (min-height: 50rem) {
    img {
      height: unset;
      width: unset;
    }
  }

  @media (min-width: 40rem) {
    img {
      max-width: 30rem;
    }
  }
</style>
