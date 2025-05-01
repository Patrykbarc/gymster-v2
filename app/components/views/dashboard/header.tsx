import { Play } from 'lucide-react'
import { Link, useLoaderData } from 'react-router'
import { Button } from '~/components/ui/button'
import { useSegment } from '~/hooks/use-segment'
import type { Headers, PathSegments } from '~/routes/dashboard/layout'

export function Header() {
  const { headers } = useLoaderData<{ headers: Headers }>()
  const { currentSegment } = useSegment() as { currentSegment: PathSegments }
  const header = headers[currentSegment]

  if (!header) return null

  return (
    <nav className="flex h-fit w-full flex-col items-start justify-between gap-4 border-b p-6 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{header.title}</h1>
        <p className="text-muted-foreground">{header.description}</p>
      </div>
      <div className="flex gap-2">
        {header.button && (
          <Button asChild>
            <Link to={`/dashboard/${header.button.href}`}>
              <Play className="mr-2 h-4 w-4" />
              {header.button.text}
            </Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
