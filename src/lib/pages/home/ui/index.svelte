<script lang="ts">
  import { AudioFetch } from '$lib/features/fetch-audio';
  import { PodcastShelf, PodcastList } from '$lib/widgets/podcasts';

  const podcasts = [
    {
      id: 1,
      title: 'hey',
      author: 'hi',
      coverUrl: 'https://placekitten.com/108/108',
    },
    {
      id: 2,
      title: 'this is a much longer title can you imagine it bruh',
      author: 'me, mak from flushvalve',
      coverUrl: 'https://placekitten.com/108/108',
    },
    {
      id: 3,
      title: 'this is a longwordhavinghardtoread title',
      author: 'same person',
      coverUrl: 'https://placekitten.com/108/108',
    },
    {
      id: 4,
      title: 'this is a longwordhavinghardtoread title',
      author: 'same person',
      coverUrl: 'https://placekitten.com/108/108',
    },
    {
      id: 5,
      title: 'this is a longwordhavinghardtoread title',
      author: 'same person',
      coverUrl: 'https://placekitten.com/108/108',
    },
  ];
</script>

<!-- <AudioFetch /> -->

<div class="bg-slate-800">
  <PodcastShelf title="Trending Now" {podcasts} />
  <PodcastList {podcasts} />
</div>
