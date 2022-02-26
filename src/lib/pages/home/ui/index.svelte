<script lang="ts">
  import { AudioFetch } from '$lib/features/fetch-audio';
  import { Podcast, podcastList } from '$lib/shared/api';
  import { PodcastShelf, PodcastList } from '$lib/widgets/podcasts';
  import { onMount } from 'svelte';

  function getRecentPodcasts() {
    return [
      {
        id: 1,
        title: 'hey',
        author: 'hi',
        coverUrl: 'https://placekitten.com/108/108',
        episodes: [],
      },
      {
        id: 2,
        title: 'this is a much longer title can you imagine it bruh',
        author: 'me, mak from flushvalve',
        coverUrl: 'https://placekitten.com/108/108',
        episodes: [],
      },
      {
        id: 3,
        title: 'this is a longwordhavinghardtoread title',
        author: 'same person',
        coverUrl: 'https://placekitten.com/108/108',
        episodes: [],
      },
      {
        id: 4,
        title: 'this is a longwordhavinghardtoread title',
        author: 'same person',
        coverUrl: 'https://placekitten.com/108/108',
        episodes: [],
      },
      {
        id: 5,
        title: 'this is a longwordhavinghardtoread title',
        author: 'same person',
        coverUrl: 'https://placekitten.com/108/108',
        episodes: [],
      },
    ];
  }

  let podcasts: Podcast[];
  let recentPodcasts: Podcast[];
  onMount(async () => {
    podcasts = await podcastList();
    recentPodcasts = getRecentPodcasts();
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
