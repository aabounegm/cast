<script lang="ts">
  export let audio: HTMLAudioElement;

  $: percent = (100 * audio.currentTime) / audio.duration;

  function seek(percent: number) {
    audio.currentTime = 0.01 * percent * audio.duration;
  }

  function move(delta: number) {
    audio.currentTime += delta;
    audio.play();
  }
</script>

<div class="flex flex-col gap-5">
  <slot />
  <input
    type="range"
    min="0"
    max="100"
    value={percent}
    on:input={(e) => seek(parseInt(e.currentTarget.value))}
  />
  <div class="flex flex-row justify-around">
    <button on:click={() => move(-10)} class="material-icons-round"> forward_10 </button>
    {#if audio.paused}
      <button class="material-icons-round" on:click={() => audio.play()}> play_arrow </button>
    {:else}
      <button class="material-icons-round" on:click={() => audio.pause()}> pause </button>
    {/if}
    <button class="material-icons-round" on:click={() => move(30)}> forward_30 </button>
  </div>
</div>

<style lang="postcss">
  .material-icons-round {
    @apply text-3xl;
  }
  button {
    @apply bg-blue-100 text-blue-800 rounded-full w-10 h-10 duration-150 flex items-center justify-center;
  }
  button:hover {
    @apply bg-blue-300;
  }
</style>
