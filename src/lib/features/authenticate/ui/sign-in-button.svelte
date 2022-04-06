<script lang="ts">
  import { signIn } from '../model/sign-in';
</script>

<button
  class="gh-button px-6 py-2 border border-white rounded-md font-extrabold cursor-pointer"
  type="button"
  on:click={signIn}
>
  Sign in with GitHub
</button>

<style>
  button {
    background-color: #24292f;
  }
</style>
