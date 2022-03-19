<script lang="ts">
  import { random, range } from 'lodash-es';

  export let lines: number;
</script>

<div class="animate-pulse flex flex-col gap-2">
  {#each range(lines) as _lineIndex}
    <div class="h-4 bg-slate-400 rounded" style:width={`${random(50, 100)}%`} />
  {/each}
</div>
