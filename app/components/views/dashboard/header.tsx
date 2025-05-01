import { Link, useLoaderData } from 'react-router'
import { Button } from '~/components/ui/button'
import { useSegment } from '~/hooks/use-segment'
import type { Headers, PathSegments } from '~/routes/dashboard/layout'

type IconMap = {
  [key: string]: React.ElementType
}

export function Header({ iconMap }: { iconMap: IconMap }) {
  const { headers } = useLoaderData<{ headers: Headers }>()
  const { currentSegment } = useSegment() as { currentSegment: PathSegments }
  const header = headers[currentSegment]
  const Icon = iconMap[header.button?.icon as keyof typeof iconMap]

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
              {Icon && <Icon />}
              {header.button.text}
            </Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
