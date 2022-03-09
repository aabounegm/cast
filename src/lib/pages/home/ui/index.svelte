<script lang="ts">
  import { onMount } from 'svelte';
  import { type Podcast, podcastList } from '$lib/shared/api';
  import { PodcastShelf, PodcastList } from '$lib/widgets/podcasts';
  import { listeningHistory } from '$lib/entities/audio/model/listening-history';
  import { AudioFetch } from '$lib/features/fetch-audio';
  import { notNull } from '$lib/shared/api/not-null';

  function getRecentPodcasts(podcasts: Podcast[]) {
    return $listeningHistory
      .map((podcastId) => podcasts.find((podcast) => podcast.id === podcastId) || null)
      .filter(notNull) as Podcast[];
  }

  let podcasts: Podcast[];
  let recentPodcasts: Podcast[];
  onMount(async () => {
    podcasts = await podcastList();
    recentPodcasts = getRecentPodcasts(podcasts);
  });
</script>

<AudioFetch />

<div class="bg-slate-800">
  {#if recentPodcasts}
    <PodcastShelf title="Recently listened" podcasts={recentPodcasts} />
  {/if}
  <!-- <PodcastShelf title="Trending now" {podcasts} /> -->
  {#if podcasts}
    <PodcastList {podcasts} />
  {/if}
</div>
