<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { HomePage } from '$lib/pages/home';
</script>

<svelte:head>
  <title>Home | Cast</title>
</svelte:head>

<HomePage />

<section>
  <span class="material-icons-round"> favorite_border </span>

  <h1 class="text-3xl font-bold underline text-yellow-400">Hello world!</h1>
</section>
