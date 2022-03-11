<script lang="ts">
  import Avatar from './avatar.svelte';
  import { user } from '$lib/entities/user';
</script>

<section class="p-4 flex items-center">
  {#if !$user}
    <span class="inline-block grow">Not synced</span>
    <slot name="login" />
  {:else}
    <Avatar image={$user.avatar} />
    <span class="inline-block mx-4 grow">Signed in as {$user.name}</span>
    <slot name="logout" />
  {/if}
</section>
