export function getLastUrlSegment(url: string) {
  return url.split('/').pop()
}
