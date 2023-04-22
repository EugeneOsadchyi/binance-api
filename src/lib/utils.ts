export function buildQueryString(params: object) {
  if (!params) return '';

  return Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURI(value)}`)
    .join('&');
}
