<script lang="ts">
  export let image: string;
  export let alt: string;
</script>

<div class="aspect-square h-12 w-12 rounded-full overflow-hidden">
  <img src={image} {alt} />
</div>
