<script lang="ts">
  import { H1 } from '$lib/shared/ui';
  import { likesStore } from '$lib/features/like-episode';
  import { EpisodeCard } from '$lib/widgets/episode';
  import type { Episode } from '$lib/shared/types';

  $: episodes = Array.from<Episode>($likesStore.values());
</script>

<!-- Sign in card -->

<!-- Favorites -->
<section class="flex flex-col p-4 gap-4 items-stretch" aria-labelledby="favorites-header">
  <H1 id="favorites-header">Favorites</H1>
  {#each episodes as episode (episode.id)}
    <EpisodeCard {episode} />
  {/each}
</section>

<!-- Available offline -->
