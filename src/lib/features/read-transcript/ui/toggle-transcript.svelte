<script lang="ts">
  import IconSubtitles from '~icons/ic/twotone-subtitles';
  import IconSubtitlesOff from '~icons/ic/twotone-subtitles-off';

  export let transcriptShown: boolean;
</script>

<button
  class="flex items-center py-2 px-3 gap-2 text-sm font-extrabold bg-slate-100 bg-opacity-5 rounded"
  on:click
>
  {#if transcriptShown}
    <IconSubtitlesOff class="w-6 h-6" />
    Hide the transcript
  {:else}
    <IconSubtitles class="w-6 h-6" />
    Read the transcript
  {/if}
</button>
