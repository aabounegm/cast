<script lang="ts">
  export let src: string;

  let paused = true;
  let time = 0;
  let duration = 0;

  $: percent = (100 * time) / duration;

  function seekPerc(percent: number) {
    time = 0.01 * percent * duration;
    console.log(percent, duration, time);
  }

  function seekSec(delta: number) {
    time += delta;
    paused = false;
  }
</script>

<div class="flex flex-col gap-5">
  <slot />
  <audio {src} bind:currentTime={time} bind:duration bind:paused>
    Your browser does not support the
    <code>audio</code> element.
  </audio>
  <input
    type="range"
    min="0"
    max="100"
    value={percent}
    on:input={(e) => seekPerc(parseInt(e.currentTarget.value))}
  />
  <div class="flex flex-row justify-around">
    <button on:click={() => seekSec(-10)}>
      <span class="material-icons-round -scale-x-100"> forward_10 </span>
    </button>
    <button on:click={() => (paused = !paused)}>
      {#if paused}
        <span class="material-icons-round"> play_arrow </span>
      {:else}
        <span class="material-icons-round"> pause </span>
      {/if}
    </button>
    <button on:click={() => seekSec(30)}>
      <span class="material-icons-round"> forward_30 </span>
    </button>
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
