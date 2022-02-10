<script lang="ts">
  import { GlobalAudio } from '$lib/widgets/audio';
  import { ClientOnly } from '$lib/shared';
  import '$lib/app.css';
</script>

<main>
  <slot />
</main>

<GlobalAudio />

<ClientOnly>
  <span data-cy="hydrated" />
</ClientOnly>
