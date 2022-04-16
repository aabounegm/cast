import cloudflare from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';
import { imagetools } from 'vite-imagetools';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: cloudflare(),
    csp: {
      directives: {
        'script-src': ['self', 'unsafe-inline'],
        'object-src': ['none'],
        'base-uri': ['none'],
        'frame-ancestors': ['none'],
      },
    },
    vite: {
      plugins: [icons({ compiler: 'svelte' }), imagetools({ include: '**/*.svg?*' })],
    },
  },
};

export default config;
