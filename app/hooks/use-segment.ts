import { useLocation } from 'react-router'

export function useSegment() {
  const location = useLocation()

  const segments = location.pathname.split('/')
  const currentSegment = segments[segments.length - 1]

  return { segments, currentSegment }
}
