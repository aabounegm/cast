import cloudflare from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: cloudflare(),
    csp: {
      directives: {
        'script-src': ['self'],
        'frame-ancestors': ['none'],
      },
    },
    vite: {
      plugins: [icons({ compiler: 'svelte' })],
    },
  },
};

export default config;
