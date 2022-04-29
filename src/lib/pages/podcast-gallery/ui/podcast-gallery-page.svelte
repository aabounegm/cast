<script lang="ts">
  import { PodcastShelf, PodcastList } from '$lib/widgets/podcasts';
  import { podcasts, trendingPodcasts } from '$lib/entities/podcast';

  import { loadListeningHistory } from '../model/load-listening-history';

  const listeningHistory = loadListeningHistory();
</script>

<div class="bg-slate-800">
  {#if listeningHistory.length > 0}
    <PodcastShelf title="Recently listened" podcasts={listeningHistory} />
  {/if}

  <PodcastShelf title="Trending now" podcasts={$trendingPodcasts} />

  <PodcastList title="All podcasts" podcasts={$podcasts} />
</div>
