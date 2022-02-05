<script lang="ts">
  export let src: string;

  let audio: HTMLAudioElement;
  let playing = false;

  function seek(delta: number) {
    audio.currentTime += delta;
    togglePlay(true);
  }

  function togglePlay(value: boolean) {
    playing = value;
    if (playing) audio.play();
    else audio.pause();
  }
</script>

<div class="flex flex-col gap-5">
  <audio bind:this={audio} {src}>
    Your browser does not support the
    <code>audio</code> element.
  </audio>
  {#if audio}
    <div class="flex flex-row justify-around">
      <button on:click={() => seek(-10)}>
        <span class="material-icons-round -scale-x-100"> forward_10 </span>
      </button>
      <button on:click={() => togglePlay(!playing)}>
        {#if playing}
          <span class="material-icons-round"> pause </span>
        {:else}
          <span class="material-icons-round"> play_arrow </span>
        {/if}
      </button>
      <button on:click={() => seek(30)}>
        <span class="material-icons-round"> forward_30 </span>
      </button>
    </div>
  {/if}
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
