<script lang="ts">
  import type { SvelteTimeRanges } from '$lib/entities/audio';
  import { formatDuration } from '$lib/shared/ui';
  import { renderTimeRanges } from '../lib/render-time-ranges';

  import { createEventDispatcher } from 'svelte';

  export let duration: number;
  export let position: number;
  export let buffered: SvelteTimeRanges = [];

  $: remaining = duration - position;

  interface ScrubbingBarEvents {
    scrub: number;
  }

  const dispatch = createEventDispatcher<ScrubbingBarEvents>();
</script>

<div>
  <input
    type="range"
    min={0}
    max={duration}
    step={0.001}
    value={position}
    aria-valuetext={formatDuration(position)}
    on:input={(e) => dispatch('scrub', parseInt(e.currentTarget.value))}
    class="scrubbing-bar slider-progress w-full"
    style:--value={position}
    style:--min={0}
    style:--max={duration}
    style:--buffered-regions={renderTimeRanges(buffered ?? [], duration, '#CBD5E1')}
  />
  <div class="flex justify-between px-2 mt-2">
    <span>{Number.isNaN(position) ? 'N/A' : formatDuration(position)}</span>
    <span>-{Number.isNaN(remaining) ? 'N/A' : formatDuration(remaining)}</span>
  </div>
</div>

<style>
  /**
   * Generated with Input range slider CSS style generator (version 20211225)
   *   https://toughengineer.github.io/demo/slider-styler
   *
   * Altered to include a CSS variable for the background
   *   that represents buffered regions, `--buffered-regions`.
   */
  input[type='range'].scrubbing-bar {
    height: 5px;
    -webkit-appearance: none;
  }

  /*progress support*/
  input[type='range'].scrubbing-bar.slider-progress {
    --range: calc(var(--max) - var(--min));
    --ratio: calc((var(--value) - var(--min)) / var(--range));
    --sx: calc(0.5 * 18px + var(--ratio) * (100% - 18px));
    --played-part: linear-gradient(#818cf8, #818cf8) 0 / var(--sx) 100% no-repeat;
    --underlying-layer: #64748b;
    --background: var(--played-part), var(--buffered-regions), var(--underlying-layer);
    background: var(--underlying-layer);
    border-radius: 3px;
  }

  input[type='range'].scrubbing-bar:focus {
    outline: none;
  }

  /*webkit*/
  input[type='range'].scrubbing-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background: linear-gradient(to bottom right, #8b5cf6, #1d4ed8);
    border: 2px solid #1e293b;
    box-shadow: none;
    margin-top: calc(max((5px - 1px - 1px) * 0.5, 0px) - max(18px * 0.5, 2px));
  }

  input[type='range'].scrubbing-bar::-webkit-slider-runnable-track {
    height: 5px;
    background: #64748b;
    border-radius: 3px;
    box-shadow: none;
  }

  input[type='range'].scrubbing-bar::-webkit-slider-thumb:hover {
    background: linear-gradient(to bottom right, #a78bfa, #3b82f6);
  }

  input[type='range'].scrubbing-bar::-webkit-slider-thumb:active {
    background: linear-gradient(to bottom right, #a78bfa, #3b82f6);
  }

  input[type='range'].scrubbing-bar.slider-progress::-webkit-slider-runnable-track {
    background: var(--background, #64748b);
  }

  /*mozilla*/
  input[type='range'].scrubbing-bar::-moz-range-thumb {
    width: max(calc(18px - 2px - 2px), 0px);
    height: max(calc(18px - 2px - 2px), 0px);
    border-radius: 18px;
    background: linear-gradient(to bottom right, #8b5cf6, #1d4ed8);
    border: 2px solid #1e293b;
    box-shadow: none;
  }

  input[type='range'].scrubbing-bar::-moz-range-track {
    height: max(calc(5px - 1px - 1px), 0px);
    border-radius: 3px;
    background: #64748b;
    box-shadow: none;
  }

  input[type='range'].scrubbing-bar::-moz-range-thumb:hover {
    background: linear-gradient(to bottom right, #a78bfa, #3b82f6);
  }

  input[type='range'].scrubbing-bar::-moz-range-thumb:active {
    background: linear-gradient(to bottom right, #a78bfa, #3b82f6);
  }

  input[type='range'].scrubbing-bar.slider-progress::-moz-range-track {
    background: var(--background, #64748b);
  }

  /*ms*/
  input[type='range'].scrubbing-bar::-ms-fill-upper {
    background: transparent;
    border-color: transparent;
  }

  input[type='range'].scrubbing-bar::-ms-fill-lower {
    background: transparent;
    border-color: transparent;
  }

  input[type='range'].scrubbing-bar::-ms-thumb {
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background: linear-gradient(to bottom right, #8b5cf6, #1d4ed8);
    border: 2px solid #1e293b;
    box-shadow: none;
    margin-top: 0;
    box-sizing: border-box;
  }

  input[type='range'].scrubbing-bar::-ms-track {
    height: 5px;
    border-radius: 3px;
    background: var(--buffered-regions), var(--underlying-layer);
    box-shadow: none;
    box-sizing: border-box;
  }

  input[type='range'].scrubbing-bar::-ms-thumb:hover {
    background: linear-gradient(to bottom right, #a78bfa, #3b82f6);
  }

  input[type='range'].scrubbing-bar::-ms-thumb:active {
    background: linear-gradient(to bottom right, #a78bfa, #3b82f6);
  }

  input[type='range'].scrubbing-bar.slider-progress::-ms-fill-lower {
    height: max(calc(5px - 1px - 1px), 0px);
    border-radius: 3px 0 0 3px;
    margin: -1px 0 -1px -1px;
    background: #818cf8;
    border-right-width: 0;
  }
</style>
