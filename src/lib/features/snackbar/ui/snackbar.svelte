<script lang="ts">
  import type { SnackbarOptions } from '../model/types';
  import { filterQueueByText } from '../model/store';

  export let options: SnackbarOptions;

  const callback = () => {
    options.callback();
    filterQueueByText(options.text);
  };
</script>

<div
  class="fixed bottom-16 mb-2 left-2 right-2 border border-white border-2 rounded-lg p-4 flex flex-col bg-background-slightly-higher"
>
  <p class="text-sm text-white mt-0 mb-4">{options.text}</p>
  <button
    class="self-end text-indigo-300 hover:text-indigo-200 text-sm font-extrabold cursor-pointer"
    on:click={callback}
  >
    {options.buttonText}
  </button>
</div>
