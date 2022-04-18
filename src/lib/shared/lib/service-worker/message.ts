export interface CheckStatusRequest {
  type: 'check-download-status';
  /** URL of episode MP3 file */
  payload: string;
}

export interface QueryDownloadsRequest {
  type: 'query-downloaded-episodes';
  payload?: void;
}

/**
 * Encodes the result type of a service worker request.
 * This is due to worker-request-response requiring it as a separate type argument.
 */
export type Result<T> = T extends CheckStatusRequest
  ? boolean
  : T extends QueryDownloadsRequest
  ? string[]
  : never;

export type ServiceWorkerRequest = CheckStatusRequest | QueryDownloadsRequest;
