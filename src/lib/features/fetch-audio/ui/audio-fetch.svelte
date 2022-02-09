<script>
  let url = '';
  
  const submit = () => {
    console.log(url);
  };
</script>

<form on:submit|preventDefault={submit} class="w-full py-8 px-10 flex bg-slate-800">
  <input
    bind:value={url}
    class="py-2 px-2 grow rounded-md bg-gray-100"
    placeholder="https://example.com/podcast.mp4"
  >
  
  <button class="ml-4 px-4 rounded-md bg-gray-100 uppercase" type="submit">
    Fetch
  </button>
</form>
