<script lang="ts">
  import Avatar from './avatar.svelte';

  const someUser = {
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    name: 'John',
  };

  export let user = null;
  const login = () => {
    user = someUser;
  };
  const logout = () => {
    user = null;
  };
</script>

<section class="p-4 flex items-center">
  {#if user}
    <Avatar image={user.avatar} />
    <span class="inline-block mx-4 grow">Signed in as {user.name}</span>
    <button class="text-indigo-300 text-sm font-extrabold" type="button" on:click={logout}>
      Sign out
    </button>
  {:else}
    <span class="inline-block grow">Not synced</span>
    <button
      class="gh-button px-6 py-2 border border-white rounded-md font-extrabold"
      type="button"
      on:click={login}
    >
      Sign in with GitHub
    </button>
  {/if}
</section>

<style>
  .gh-button {
    background-color: #24292f;
  }
</style>
