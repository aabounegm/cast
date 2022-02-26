<script lang="ts">
  import { AudioFetch } from '$lib/features/fetch-audio';
  import { PodcastShelf, PodcastList } from '$lib/widgets/podcasts';

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

  function getPodcasts() {
    return [
      {
        id: 1,
        title: 'hey',
        author: 'hi',
        coverUrl: 'https://placekitten.com/108/108',
        episodes: [],
      },
    ];
  }
</script>

<AudioFetch />

<div class="bg-slate-800">
  <PodcastShelf title="Recently listened" podcasts={getRecentPodcasts()} />
  <!-- <PodcastShelf title="Trending now" {podcasts} /> -->
  <PodcastList podcasts={getPodcasts()} />
</div>
