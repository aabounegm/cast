import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapterCloudflare(),
    vite: {
      plugins: [icons({ compiler: 'svelte' })],
    },
  },
};

export default config;
