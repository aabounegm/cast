<script lang="ts">
  import { snackbarQueue } from './store';
  import Snackbar from './snackbar.svelte';

  $: activeSnackbar = $snackbarQueue[0] || null;
</script>

{#if activeSnackbar}
  <Snackbar options={activeSnackbar} />
{/if}
