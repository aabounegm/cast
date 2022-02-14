<script lang="ts">
  import { audioStore } from '$lib/features/fetch-audio';
  import ScrubbingBar from './scrubbing-bar.svelte';

  let audioEl: HTMLAudioElement;
  
  let duration = 0;
  let currentTime = 0;
  let bufferTime = 0;
  
  const timeUpdate = () => {
    if (!audioEl) return;
    duration = audioEl.duration;
    currentTime = audioEl.currentTime || 0;
    if (audioEl.buffered.length) {
      bufferTime = audioEl.buffered.end(audioEl.buffered.length - 1) || 0;
    }
  };
  
  audioStore.subscribe((val) => {
    if (!audioEl) return;
    audioEl.pause();
    audioEl.src = val;
    audioEl.currentTime = 0;
    audioEl.play();
  });
</script>

<div class="fixed bottom-0 left-0 right-0 py-8 px-10 bg-slate-800">
  <audio bind:this={audioEl} on:timeupdate={timeUpdate} />

  <ScrubbingBar
    bufferPercent={((bufferTime / duration) || 0) * 100}
    percent={((currentTime / duration) || 0) * 100}
  />
  <div class="flex justify-between">
    <span class="text-gray-100 leading-6">{currentTime}</span>
    <span class="text-gray-100 leading-6">{duration}</span>
  </div>
</div>
