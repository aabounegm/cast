<script lang="ts">
  import IconReplay10 from '~icons/ic/round-replay-10';
  import IconForward30 from '~icons/ic/round-forward-30';
  import { PlaybackButton, toggleGlobalPlayback } from '$lib/features/playback-controls';
  import { IconButton } from '$lib/shared/ui';
  import { move, paused } from '$lib/entities/audio';
  import { currentlyPlayingEpisode } from '$lib/entities/episode';
  import { getPodcastByID } from '$lib/entities/podcast';
  import { NowPlaying } from '$lib/widgets/now-playing';

  $: episode = $currentlyPlayingEpisode!;
  $: podcast = getPodcastByID(episode.podcastID)!;

  let nowPlayingActive = true;
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
  <div class="flex justify-between">
    <IconButton
      name="Replay the last 10 seconds"
      icon={IconReplay10}
      class="w-9 h-9"
      iconClass="w-7 h-7"
      on:click={(e) => {
        e.stopPropagation();
        move(-10);
      }}
    />
    <PlaybackButton
      playing={!$paused}
      on:click={(e) => {
        e.stopPropagation();
        toggleGlobalPlayback();
      }}
    />
    <IconButton
      name="Skip forward 30 seconds"
      icon={IconForward30}
      class="w-9 h-9"
      iconClass="w-7 h-7"
      on:click={(e) => {
        e.stopPropagation();
        move(30);
      }}
    />
  </div>
</div>
