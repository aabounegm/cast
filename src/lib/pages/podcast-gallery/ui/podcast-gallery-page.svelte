<script lang="ts">
  import { PodcastShelf, PodcastList, SkeletonPodcastShelf } from '$lib/widgets/podcasts';
  import { podcasts, trendingPodcasts } from '$lib/entities/podcast';

  import { loadListeningHistory } from '../model/load-listening-history';

  const listeningHistoryLoaded = loadListeningHistory();
</script>

<div class="bg-slate-800">
  {#await listeningHistoryLoaded}
    <SkeletonPodcastShelf title="Recently listened" />
  {:then recentlyListenedPodcasts}
    <PodcastShelf title="Recently listened" podcasts={recentlyListenedPodcasts} />
  {/await}

  <PodcastShelf title="Trending now" podcasts={$trendingPodcasts} />

  <PodcastList title="All podcasts" podcasts={$podcasts} />
</div>
