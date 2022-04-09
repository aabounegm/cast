<script lang="ts">
  import { Image } from '$lib/shared/ui';
  export let image: string;
</script>

<Image class="aspect-square h-12 w-12 rounded-full overflow-hidden block" src={image} alt="" />
