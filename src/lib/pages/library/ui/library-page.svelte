<script lang="ts">
  import { H1 } from '$lib/shared/ui';
  import { likesStore } from '$lib/features/like-episode';
  import { EpisodeCard } from '$lib/widgets/episode';
  import { UserContainer } from '$lib/entities/user';
  import { SignInButton, SignOutButton } from '$lib/features/authenticate';
  import { getEpisode } from '../lib/get-episode';
</script>

<!-- Sign in card -->
<UserContainer>
  <svelte:fragment slot="login">
    <SignInButton />
  </svelte:fragment>
  <svelte:fragment slot="logout">
    <SignOutButton />
  </svelte:fragment>
</UserContainer>

<!-- Favorites -->
<section class="flex flex-col p-4 gap-4 items-stretch" aria-labelledby="favorites-header">
  <H1 id="favorites-header">Favorites</H1>

  {#each [...$likesStore] as id}
    {#await getEpisode(id)}
      <p>Loading...</p>
    {:then episode}
      {#if episode}
        <EpisodeCard {episode} />
      {:else}
        <p>Error</p>
      {/if}
    {/await}
  {/each}
</section>

<!-- Available offline -->
