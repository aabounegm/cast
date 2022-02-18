<script lang="ts">
  import { onMount } from 'svelte';
  import { GlobalAudio } from '$lib/widgets/audio';
  import '$lib/app.css';
  import { podcastRead } from '$lib/shared/supabase';
  
  // Just for the test
  onMount(async () => {
    await podcastRead();
  });
</script>

<main>
  <slot />
</main>

<GlobalAudio />
