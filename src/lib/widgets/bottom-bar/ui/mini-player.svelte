<script context="module" lang="ts">
  export interface MiniPlayerEvents {
    expand: void;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import IconReplay10 from '~icons/ic/round-replay-10';
  import IconForward30 from '~icons/ic/round-forward-30';
  import { PlaybackButton } from '$lib/features/playback-controls';
  import { move, paused, play, pause } from '$lib/entities/audio';
  import { currentlyPlayingEpisode } from '$lib/entities/episode';
  import { getPodcastByID } from '$lib/entities/podcast';
  import { IconButton, Image } from '$lib/shared/ui';

  $: episode = $currentlyPlayingEpisode!;
  $: podcast = getPodcastByID(episode.podcastID)!;

  function attachKeyboardListener(event: FocusEvent) {
    (event.target as HTMLElement | null)?.addEventListener('keydown', expandOnKeyboardActivation);
  }

  function removeKeyboardListener(event: FocusEvent) {
    (event.target as HTMLElement | null)?.removeEventListener(
      'keydown',
      expandOnKeyboardActivation
    );
  }

  function expandOnKeyboardActivation(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      dispatch('expand');
    }
  }

  const dispatch = createEventDispatcher<MiniPlayerEvents>();
</script>

{#if podcast !== undefined}
  <article
    class="flex items-center p-1 gap-2 cursor-pointer rounded-lg bg-slate-800"
    aria-label="Now Playing: {episode.title}"
    tabindex="0"
    on:focus={attachKeyboardListener}
    on:blur={removeKeyboardListener}
    on:click={() => dispatch('expand')}
  >
    <Image class="w-10 h-10 rounded overflow-hidden" src={podcast.coverUrl} alt="" />
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
      <PlaybackButton playing={!$paused} on:play={play} on:pause={pause} />
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
  </article>
{/if}
