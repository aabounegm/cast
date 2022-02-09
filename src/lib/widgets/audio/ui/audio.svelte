<script lang="ts">
  import { audioStore } from '$lib/features/fetch-audio';
  import ScrubbingBar from './scrubbing-bar.svelte';
  
  let audioEl = null as HTMLAudioElement;
  audioStore.subscribe((val) => {
    if (!audioEl) return;
    audioEl.pause();
    audioEl.src = val;
    audioEl.currentTime = 0;
    audioEl.play();
  });
</script>

<div class="fixed bottom-0 left-0 right-0 py-8 px-10 bg-slate-800">
  <audio bind:this={audioEl}></audio>
  
  <ScrubbingBar />
  <div class="flex justify-between">
    <span class="text-gray-100 leading-6">13:37</span>
    <span class="text-gray-100 leading-6">-44:37</span>
  </div>
</div>
