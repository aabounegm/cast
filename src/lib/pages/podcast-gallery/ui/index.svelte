<script lang="ts">
  import { onMount } from 'svelte';
  import { PodcastShelf, PodcastList } from '$lib/widgets/podcasts';
  import { listeningHistory } from '$lib/features/listening-history';
  import { fetchTrending } from '$lib/features/trending-podcasts';
  import { podcasts } from '$lib/entities/podcast';
  import { notNull, type Podcast } from '$lib/shared/api';

  function getRecentPodcasts(podcasts: Podcast[]) {
    return $listeningHistory
      .map((podcastId) => podcasts.find((podcast) => podcast.id === podcastId) || null)
      .filter(notNull);
  }

  function getTrendingPodcasts(ids: Array<Podcast['id']>) {
    return ids
      .map((podcastId) => $podcasts.find((podcast) => podcast.id === podcastId) ?? null)
      .filter(notNull);
  }

  let recentPodcasts: Podcast[];
  let trendingPodcasts: Podcast[] = [];
  onMount(async () => {
    recentPodcasts = getRecentPodcasts($podcasts);
    const trendingIds = await fetchTrending();
    trendingPodcasts = getTrendingPodcasts(trendingIds);
  });
</script>

<div class="bg-slate-800">
  {#if recentPodcasts}
    <PodcastShelf title="Recently listened" podcasts={recentPodcasts} />
  {/if}
  <PodcastShelf title="Trending now" podcasts={trendingPodcasts} />
  {#if $podcasts}
    <PodcastList title="All podcasts" podcasts={$podcasts} />
  {/if}
</div>
