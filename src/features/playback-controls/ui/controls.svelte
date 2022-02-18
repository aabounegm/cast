<script lang="ts">
  import { play, pause, seek, move, audio } from 'src/entities/audio/model/audio-instance';
  export let showSeeker = false;
  $: percent = (100 * $audio.currentTime) / $audio.duration;
</script>

<div class="flex flex-col gap-5">
  {#if showSeeker}
    <input
      type="range"
      min="0"
      max="100"
      value={percent}
      on:input={(e) => seek(parseInt(e.currentTarget.value))}
    />
  {/if}
  <div class="flex flex-row justify-around">
    <button class="material-icons-round icon-button" on:click={() => move(-10)}>
      forward_10
    </button>
    {#if $audio.paused}
      <button class="material-icons-round icon-button" on:click={() => play()}> play_arrow </button>
    {:else}
      <button class="material-icons-round icon-button" on:click={pause}> pause </button>
    {/if}
    <button class="material-icons-round icon-button" on:click={() => move(30)}> forward_30 </button>
  </div>
</div>
