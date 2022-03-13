<script lang="ts">
  import { signOut } from '../model/sign-out';
</script>

<button
  class="text-indigo-300 hover:text-indigo-200 text-sm font-extrabold cursor-pointer"
  type="button"
  on:click={signOut}
>
  Sign out
</button>
