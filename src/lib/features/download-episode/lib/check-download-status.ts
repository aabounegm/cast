import { sendRequest } from 'worker-request-response';
import type { CheckStatusRequest, Result } from '$lib/shared/lib';

export async function checkDownloadStatus(url: string): Promise<boolean> {
  if (navigator.serviceWorker.controller === null) {
    return false;
  }
  return sendRequest<CheckStatusRequest, Result<CheckStatusRequest>>(
    navigator.serviceWorker.controller,
    {
      type: 'check-download-status',
      payload: url,
    }
  );
}
