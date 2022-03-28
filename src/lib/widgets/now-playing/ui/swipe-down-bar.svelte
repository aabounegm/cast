<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { detectSwipe } from '../lib/detect-swipe';

  const dispatch = createEventDispatcher<{ minimize: void }>();

  const { handlePointerMove, handlePointerStart, handlePointerUp } = detectSwipe({
    down: () => {
      dispatch('minimize');
    },
  });
</script>

<button
  class="absolute -top-6 w-full py-3 flex justify-center touch-none"
  on:pointerdown={handlePointerStart}
  on:pointermove={handlePointerMove}
  on:pointerup={handlePointerUp}
>
  <span class="inline-block w-14 h-1 rounded-full bg-slate-500 cursor-pointer" />
</button>
