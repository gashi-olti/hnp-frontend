export default function authHeaders(token: string, headers?: any) {
  const requestHeaders: HeadersInit = new Headers(headers);
  requestHeaders.set('Authorization', `Bearer ${token}`);
  return requestHeaders;
}
