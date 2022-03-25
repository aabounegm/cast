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

  let nowPlayingActive = false;
</script>

{#if nowPlayingActive}
  <NowPlaying {podcast} {episode} on:minimize={() => (nowPlayingActive = false)} />
{/if}

<div
  class="flex items-center p-1 gap-2 cursor-pointer rounded-lg bg-slate-800"
  on:click={() => {
    nowPlayingActive = true;
  }}
>
  <img class="w-10 h-10 rounded" src={podcast?.coverUrl} width="40" alt="" />
  <div class="flex justify-between px-3 gap-2">
    <IconButton
      name="Replay the last 10 seconds"
      icon={IconReplay10}
      class="w-8 h-8"
      iconClass="w-6 h-6"
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
      class="w-8 h-8"
      iconClass="w-6 h-6"
      on:click={(e) => {
        e.stopPropagation();
        move(30);
      }}
    />
  </div>
</div>
