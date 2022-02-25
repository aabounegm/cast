import auto from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: auto(),
    vite: {
      plugins: [icons({ compiler: 'svelte' })],
    },
  },
};

export default config;
