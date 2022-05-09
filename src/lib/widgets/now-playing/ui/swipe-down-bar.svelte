<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { draggableDown } from '../lib/draggable-down';

  const dispatch = createEventDispatcher<{ minimize: void; move: number }>();
</script>

<div
  class="absolute top-0 left-0 w-full py-3 flex justify-center touch-none p-12"
  use:draggableDown={{
    threshold: 100,
    onDrag: (dragAmount) => {
      if (dragAmount > 0) {
        dispatch('move', dragAmount);
      }
    },
    onDragFailed: () => dispatch('move', 0),
    onDragCompleted: () => dispatch('minimize'),
  }}
>
  <span class="inline-block w-14 h-1 rounded-full bg-slate-500 cursor-pointer" />
</div>
