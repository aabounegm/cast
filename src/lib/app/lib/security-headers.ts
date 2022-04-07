/**
 * For information about why these headers and values were chosen,
 *   see https://securityheaders.com/
 */
const securityHeaders = new Map([
  ['X-Frame-Options', 'SAMEORIGIN'],
  ['X-Content-Type-Options', 'nosniff'],
  ['Referrer-Policy', 'no-referrer'],
  ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains'],
]);

export function setSecurityHeaders(response: Response) {
  for (const [headerName, headerValue] of securityHeaders.entries()) {
    response.headers.set(headerName, headerValue);
  }
}
