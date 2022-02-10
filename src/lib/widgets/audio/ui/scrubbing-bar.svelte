<script lang="ts">
  export let percent = 0;
  export let bufferPercent = 0;
</script>

<div class="relative w-full h-4 cursor-pointer">
  <!-- Background bar -->
  <div class="absolute inline-block left-0 top-1 w-full h-1.5 bg-slate-500 rounded-sm" />

  <!-- Loading (Buffer) bar -->
  <div
    style:width={`${bufferPercent}%`}
    class="absolute inline-block left-0 top-1 w-3/4 h-1.5 bg-slate-300 rounded-sm transition"
  />

  <!-- Progress bar -->
  <div
    style:width={`${percent}%`}
    class="absolute inline-block left-0 top-1 w-1/2 h-1.5 bg-indigo-400 rounded-sm transition"
  />

  <!-- Scrubbing handle -->
  <div
    style:left={`${percent}%`}
    class="absolute inline-block top-0 w-4 h-4 rounded-full bg-indigo-500 border border-slate-800 -translate-x-2a/4 transition"
  />
</div>
