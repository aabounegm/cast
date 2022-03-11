<script lang="ts">
  import { logout } from '../api/requests';
</script>

<button
  class="text-indigo-300 hover:text-indigo-200 text-sm font-extrabold cursor-pointer"
  type="button"
  on:click={logout}
>
  Sign out
</button>
