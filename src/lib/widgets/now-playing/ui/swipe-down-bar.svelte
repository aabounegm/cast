<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { detectSwipe } from '../lib/detect-swipe';

  const dispatch = createEventDispatcher<{ minimize: void }>();

  export let yDiff = 0;

  const { handlePointerMove, handlePointerStart, handlePointerUp } = detectSwipe({
    down: () => {
      dispatch('minimize');
      setTimeout(() => {
        yDiff = 0;
      }, 100);
    },
  });

  const handleMove = (e: PointerEvent) => {
    const difference = handlePointerMove(e);
    if (!difference || difference.yDiff > 0) return;
    yDiff = difference.yDiff * -1;
  };
  const handleUp = (e: PointerEvent) => {
    handlePointerUp(e);
    yDiff = 0;
  };
</script>

<button
  class="absolute top-0 w-full py-3 flex justify-center touch-none"
  on:pointerdown={handlePointerStart}
  on:pointermove={handleMove}
  on:pointerup={handleUp}
>
  <span class="inline-block w-14 h-1 rounded-full bg-slate-500 cursor-pointer" />
</button>
