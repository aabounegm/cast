<script lang="ts">
  import { currentlyPlayingEpisode } from '$lib/entities/episode';
  import { getPodcastByID } from '$lib/entities/podcast';
  import { NowPlaying } from '$lib/widgets/now-playing';
  import PlaybackControlButtons from '$lib/features/playback-controls/ui/playback-control-buttons.svelte';

  $: episode = $currentlyPlayingEpisode!;
  $: podcast = getPodcastByID(episode.podcastID)!;

  let nowPlayingActive = false;
</script>

{#if nowPlayingActive}
  <NowPlaying {podcast} {episode} on:minimize={() => (nowPlayingActive = false)} />
{/if}

<div
  class="flex justify-evenly grow-[0.5] cursor-pointer rounded-lg bg-slate-800 py-2"
  on:click={() => {
    nowPlayingActive = true;
  }}
>
  <img src={podcast?.coverUrl} width="40" alt="" />
  <PlaybackControlButtons />
</div>
