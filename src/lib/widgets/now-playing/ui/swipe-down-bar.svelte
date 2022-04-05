<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { detectSwipe } from '../lib/detect-swipe';

  const dispatch = createEventDispatcher<{ minimize: void; move: number }>();

  export let yDiff = 0;
  const changeYDiff = (amount: number) => {
    yDiff = amount;
    dispatch('move', amount);
  };

  const { handlePointerMove, handlePointerStart, handlePointerUp } = detectSwipe({
    down: () => {
      dispatch('minimize');
      setTimeout(() => {
        changeYDiff(0);
      }, 100);
    },
  });
  const handleMove = (e: PointerEvent) => {
    const difference = handlePointerMove(e);
    if (!difference || difference.yDiff > 0) return;
    changeYDiff(difference.yDiff * -1);
  };
  const handleUp = (e: PointerEvent) => {
    handlePointerUp(e);
    changeYDiff(0);
  };
</script>

<div
  class="absolute top-0 left-0 w-full py-3 flex justify-center touch-none"
  on:pointerdown={handlePointerStart}
  on:pointermove={handleMove}
  on:pointerup={handleUp}
>
  <span class="inline-block w-14 h-1 rounded-full bg-slate-500 cursor-pointer" />
</div>
