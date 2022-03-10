<script lang="ts">
  import { onMount } from 'svelte';
  import { PodcastShelf, PodcastList } from '$lib/widgets/podcasts';
  import { AudioFetch } from '$lib/features/fetch-audio';
  import { listeningHistory } from '$lib/entities/audio';
  import { podcasts } from '$lib/entities/podcast';
  import { notNull, type Podcast } from '$lib/shared/api';

  function getRecentPodcasts(podcasts: Podcast[]) {
    return $listeningHistory
      .map((podcastId) => podcasts.find((podcast) => podcast.id === podcastId) || null)
      .filter(notNull) as Podcast[];
  }

  let recentPodcasts: Podcast[];
  onMount(async () => {
    recentPodcasts = getRecentPodcasts($podcasts);
  });
</script>

<AudioFetch />

<div class="bg-slate-800">
  {#if recentPodcasts}
    <PodcastShelf title="Recently listened" podcasts={recentPodcasts} />
  {/if}
  <!-- <PodcastShelf title="Trending now" {podcasts} /> -->
  {#if $podcasts}
    <PodcastList podcasts={$podcasts} />
  {/if}
</div>
