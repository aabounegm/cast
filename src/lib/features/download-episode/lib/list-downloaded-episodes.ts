import { sendRequest } from 'worker-request-response';
import { podcastList } from '$lib/entities/podcast';
import type { Episode } from '$lib/shared/api';
import type { QueryDownloadsRequest, Result } from '$lib/shared/lib/service-worker/message';

async function listDownloadedEpisodeUrls(): Promise<string[]> {
  if (navigator.serviceWorker.controller === null) {
    return [];
  }
  const urls = await sendRequest<QueryDownloadsRequest, Result<QueryDownloadsRequest>>(
    navigator.serviceWorker.controller,
    {
      type: 'query-downloaded-episodes',
    }
  );

  return urls.map((url) => {
    const urlObj = new URL(url);
    urlObj.searchParams.delete('download');
    return urlObj.toString();
  });
}

export async function getDownloadedEpisodes(): Promise<Episode[]> {
  const offlineUrls = await listDownloadedEpisodeUrls();
  const podcasts = await podcastList();
  const episodes = podcasts.flatMap((podcast) => podcast.episodes);
  return episodes.filter((episode) => offlineUrls.includes(episode.audioUrl));
}
