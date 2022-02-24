import adapterStatic from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapterStatic(),
    vite: {
      plugins: [icons({ compiler: 'svelte' })],
    },
  },
};

export default config;
