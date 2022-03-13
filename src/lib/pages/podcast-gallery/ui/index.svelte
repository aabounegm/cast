<script lang="ts">
  import { onMount } from 'svelte';
  import { PodcastShelf, PodcastList } from '$lib/widgets/podcasts';
  import { listeningHistory } from '$lib/features/listening-history';
  import { podcasts } from '$lib/entities/podcast';
  import { notNull, type Podcast } from '$lib/shared/api';
  import { snackbar } from '$lib/shared/ui/snackbar';

  function getRecentPodcasts(podcasts: Podcast[]) {
    return $listeningHistory
      .map((podcastId) => podcasts.find((podcast) => podcast.id === podcastId) || null)
      .filter(notNull) as Podcast[];
  }

  let recentPodcasts: Podcast[];
  onMount(async () => {
    recentPodcasts = getRecentPodcasts($podcasts);
  });

  const showSnackbar = () => {
    snackbar({
      text: 'Hello',
      buttonText: 'Hide',
      callback: () => {},
    });
  };
  const showSecondSnackbar = () => {
    snackbar({
      text: 'Example 2',
      buttonText: 'Hide',
      callback: () => {},
    });
  };
</script>

<div class="bg-slate-800">
  {#if recentPodcasts}
    <PodcastShelf title="Recently listened" podcasts={recentPodcasts} />
  {/if}
  <!-- <PodcastShelf title="Trending now" {podcasts} /> -->
  {#if $podcasts}
    <PodcastList podcasts={$podcasts} />
  {/if}
</div>

<!--
TODO: this is only to show the snackbar in action.
  Remove after connecting the snackbars with other components
-->
<div class="flex px-4 py-2 gap-2">
  <button
    type="button"
    class="p-2 border border-white rounded cursor-pointer"
    on:click={showSnackbar}
  >
    Call the first snackbar
  </button>
  <button
    type="button"
    class="p-2 border border-white rounded cursor-pointer"
    on:click={showSecondSnackbar}
  >
    Call the second snackbar
  </button>
</div>
