<script lang="ts">
  export let audio: HTMLAudioElement;
  export let showSeeker = false;

  $: percent = (100 * audio.currentTime) / audio.duration;

  function play() {
    // need this because `audio.paused` wasn't reactive otherwise
    audio.currentTime = audio.currentTime;
    audio.play();
  }
  function pause() {
    // need this because `audio.paused` wasn't reactive otherwise
    audio.currentTime = audio.currentTime;
    audio.pause();
  }
  function seek(percent: number) {
    audio.currentTime = 0.01 * percent * audio.duration;
  }
  function move(delta: number) {
    audio.currentTime += delta;
    play();
  }
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
    <button on:click={() => move(-10)} class="material-icons-round"> forward_10 </button>
    {#if audio.paused}
      <button class="material-icons-round" on:click={play}> play_arrow </button>
    {:else}
      <button class="material-icons-round" on:click={pause}> pause </button>
    {/if}
    <button class="material-icons-round" on:click={() => move(30)}> forward_30 </button>
  </div>
</div>

<style lang="postcss">
  .material-icons-round {
    @apply text-3xl;
  }
  button {
    @apply rounded-full w-10 h-10 duration-150 flex items-center justify-center;
  }
  button:hover {
    @apply bg-slate-700;
  }
  button:active {
    @apply bg-slate-600;
  }
</style>
