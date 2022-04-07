import { base } from '$app/paths';
import appIconSvg from './app-icon.svg';
import appIconPng192 from './app-icon.svg?width=192&png';
import appIconPng512 from './app-icon.svg?width=512&png';
import type { WebAppManifest } from 'web-app-manifest';
import type { RequestHandler } from '@sveltejs/kit';

const manifest: WebAppManifest = {
  /* eslint-disable camelcase */
  name: 'Cast',
  short_name: 'Cast',
  description: 'Listen to podcasts on the web, wherever!',
  start_url: base,
  background_color: '#1E293B',
  theme_color: '#6366F1',
  display: 'standalone',
  orientation: 'portrait',
  lang: 'en',
  icons: [
    {
      src: appIconSvg,
      type: 'image/svg+xml',
      purpose: 'any maskable',
      sizes: '512x512',
    },
    {
      src: appIconPng192,
      type: 'image/png',
      purpose: 'any maskable',
      sizes: '192x192',
    },
    {
      src: appIconPng512,
      type: 'image/png',
      purpose: 'any maskable',
      sizes: '512x512',
    },
  ],
  /* eslint-enable camelcase */
};

/**
 * Construct a PWA manifest.
 *
 * For details, see https://web.dev/add-manifest/
 */
export const buildManifest: RequestHandler = () => ({
  body: JSON.stringify(manifest),
});
