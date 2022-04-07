import { sendRequest } from 'worker-request-response';

export async function checkDownloadStatus(url: string): Promise<boolean> {
  if (navigator.serviceWorker.controller === null) {
    return false;
  }
  return sendRequest(navigator.serviceWorker.controller, url);
}
