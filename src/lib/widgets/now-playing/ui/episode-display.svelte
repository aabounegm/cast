<script lang="ts">
  import type { Episode, Podcast } from '$lib/shared/types';
  export let episode: Episode;
  export let podcast: Podcast;
</script>

<img class="flex rounded-2xl" src={podcast.coverUrl} alt="" />

<div class="flex pt-6 font-raleway text-lg text-center leading-6 font-extrabold text-slate-100">
  {episode.title}
</div>

<div class="pt-2 font-lato text-xs text-center leading-4 text-slate-100 ">
  {podcast.author} &mdash; {podcast.title}
</div>
