export interface CheckStatusRequest {
  type: 'check-download-status';
  /** URL of episode MP3 file */
  payload: string;
}
/**
 * Encodes the result type of a service worker request.
 * This is due to worker-request-response requiring it as a separate type argument.
 */
export type Result<T> = T extends CheckStatusRequest ? boolean : never;

export type ServiceWorkerRequest = CheckStatusRequest;
