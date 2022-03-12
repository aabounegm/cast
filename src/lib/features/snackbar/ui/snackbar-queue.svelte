<script lang="ts">
  import { snackbarQueue } from '../model/store';
  import Snackbar from './snackbar.svelte';

  $: activeSnackbar = $snackbarQueue[0] || null;
</script>

{#if activeSnackbar}
  <Snackbar snackbar={activeSnackbar} />
{/if}
