<script lang="ts">
  import { PodcastShelf, PodcastList } from '$lib/widgets/podcasts';
  import { listeningHistory } from '$lib/features/listening-history';
  import { podcasts, trendingPodcasts } from '$lib/entities/podcast';
  import { notNull } from '$lib/shared/api';

  $: podcastsInHistory = $listeningHistory
    .map((thisID) => $podcasts.find((podcast) => podcast.id === thisID) ?? null)
    .filter(notNull);
</script>

<div class="bg-slate-800">
  {#if podcastsInHistory.length > 0}
    <PodcastShelf title="Recently listened" podcasts={podcastsInHistory} id="recently-listened" />
  {/if}

  {#if $trendingPodcasts.length > 0}
    <PodcastShelf title="Trending now" podcasts={$trendingPodcasts} id="trending-now" />
  {/if}

  <PodcastList title="All podcasts" podcasts={$podcasts} id="all-podcasts" />
</div>
