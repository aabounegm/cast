<script lang="ts">
import { formatDuration } from '$lib/shared/ui';

  import { createEventDispatcher } from 'svelte';

  export let duration: number;
  export let position: number;
  // export let buffered: TimeRanges;

  $: remaining = duration - position;

  interface ScrubbingBarEvents {
    scrub: { position: number };
  }

  const dispatch = createEventDispatcher<ScrubbingBarEvents>();
</script>

<div>
  <input
    type="range"
    min={0}
    max={duration}
    step={0.01}
    value={position}
    on:input={(e) => dispatch('scrub', { position: parseInt(e.currentTarget.value) })}
    class="scrubbing-bar slider-progress w-full"
    style="--value: {position}; --min: {0}; --max: {duration};"
  />
  <div class="flex justify-between px-2 mt-2 font-medium">
    <span>{isNaN(position) ? 'N/A' : formatDuration(position)}</span>
    <span>-{isNaN(remaining) ? 'N/A' : formatDuration(remaining)}</span>
  </div>
</div>


<style>
  /**
   * Generated with Input range slider CSS style generator (version 20211225)
   *   https://toughengineer.github.io/demo/slider-styler
   */
  input[type=range].scrubbing-bar {
    height: 5px;
    -webkit-appearance: none;
  }

  /*progress support*/
  input[type=range].scrubbing-bar.slider-progress {
    --range: calc(var(--max) - var(--min));
    --ratio: calc((var(--value) - var(--min)) / var(--range));
    --sx: calc(0.5 * 18px + var(--ratio) * (100% - 18px));
  }

  input[type=range].scrubbing-bar:focus {
    outline: none;
  }

  /*webkit*/
  input[type=range].scrubbing-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background: linear-gradient(to bottom right, #8B5CF6, #1D4ED8);
    border: 2px solid #1E293B;
    box-shadow: none;
    margin-top: calc(max((5px - 1px - 1px) * 0.5,0px) - max(18px * 0.5,2px));
  }

  input[type=range].scrubbing-bar::-webkit-slider-runnable-track {
    height: 5px;
    background: #64748B;
    box-shadow: none;
  }

  input[type=range].scrubbing-bar::-webkit-slider-thumb:hover {
    background: linear-gradient(to bottom right, #A78BFA, #3B82F6);
  }

  input[type=range].scrubbing-bar::-webkit-slider-thumb:active {
    background: linear-gradient(to bottom right, #A78BFA, #3B82F6);
  }

  input[type=range].scrubbing-bar.slider-progress::-webkit-slider-runnable-track {
    background: linear-gradient(#818CF8,#818CF8) 0/var(--sx) 100% no-repeat, #64748B;
  }

  /*mozilla*/
  input[type=range].scrubbing-bar::-moz-range-thumb {
    width: max(calc(18px - 2px - 2px),0px);
    height: max(calc(18px - 2px - 2px),0px);
    border-radius: 18px;
    background: linear-gradient(to bottom right, #8B5CF6, #1D4ED8);
    border: 2px solid #1E293B;
    box-shadow: none;
  }

  input[type=range].scrubbing-bar::-moz-range-track {
    height: max(calc(5px - 1px - 1px),0px);
    border-radius: 0.5em;
    background: #64748B;
    box-shadow: none;
  }

  input[type=range].scrubbing-bar::-moz-range-thumb:hover {
    background: linear-gradient(to bottom right, #A78BFA, #3B82F6);
  }

  input[type=range].scrubbing-bar::-moz-range-thumb:active {
    background: linear-gradient(to bottom right, #A78BFA, #3B82F6);
  }

  input[type=range].scrubbing-bar.slider-progress::-moz-range-track {
    background: linear-gradient(#818CF8,#818CF8) 0/var(--sx) 100% no-repeat, #64748B;
  }

  /*ms*/
  input[type=range].scrubbing-bar::-ms-fill-upper {
    background: transparent;
    border-color: transparent;
  }

  input[type=range].scrubbing-bar::-ms-fill-lower {
    background: transparent;
    border-color: transparent;
  }

  input[type=range].scrubbing-bar::-ms-thumb {
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background: linear-gradient(to bottom right, #8B5CF6, #1D4ED8);
    border: 2px solid #1E293B;
    box-shadow: none;
    margin-top: 0;
    box-sizing: border-box;
  }

  input[type=range].scrubbing-bar::-ms-track {
    height: 5px;
    border-radius: 0.5em;
    background: #64748B;
    box-shadow: none;
    box-sizing: border-box;
  }

  input[type=range].scrubbing-bar::-ms-thumb:hover {
    background: linear-gradient(to bottom right, #A78BFA, #3B82F6);
  }

  input[type=range].scrubbing-bar::-ms-thumb:active {
    background: linear-gradient(to bottom right, #A78BFA, #3B82F6);
  }

  input[type=range].scrubbing-bar.slider-progress::-ms-fill-lower {
    height: max(calc(5px - 1px - 1px),0px);
    border-radius: 0.5em 0 0 0.5em;
    margin: -1px 0 -1px -1px;
    background: #818CF8;
    border-right-width: 0;
  }
</style>
