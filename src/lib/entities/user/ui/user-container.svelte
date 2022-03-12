<script lang="ts">
  import Avatar from './avatar.svelte';
  import { user } from '../model/store';
</script>

<section class="p-4 flex items-center">
  {#if !$user}
    <span class="inline-block grow">Not synced</span>
    <slot name="login" />
  {:else}
    <Avatar image={$user.user_metadata.avatar_url} />
    <span class="inline-block mx-4 grow">Signed in as {$user.user_metadata.preferred_username}</span
    >
    <slot name="logout" />
  {/if}
</section>
