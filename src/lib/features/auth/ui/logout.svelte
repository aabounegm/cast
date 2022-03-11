<script lang="ts">
  import { logout } from '../api/requests';
</script>

<button class="text-indigo-300 text-sm font-extrabold" type="button" on:click={logout}>
  Sign out
</button>
