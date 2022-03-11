<script lang="ts">
  import { login } from '../api/requests';
</script>

<button
  class="gh-button px-6 py-2 border border-white rounded-md font-extrabold"
  type="button"
  on:click={login}
>
  Sign in with GitHub
</button>

<style>
  button {
    background-color: #24292f;
  }
</style>
