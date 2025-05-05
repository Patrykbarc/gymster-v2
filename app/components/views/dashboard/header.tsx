import { Play, Plus } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { useSegment } from '~/hooks/use-segment'

type HeaderDataStructure = {
  [key: string]: {
    title: string
    description: string
    button?: {
      icon: React.ReactNode
      text: string
      href: string
    }
  }
}

const getHeaderData: HeaderDataStructure = {
  dashboard: {
    title: 'Dashboard',
    description: 'Track your fitness journey and monitor your progress',
    button: {
      icon: <Play />,
      text: 'Start Workout',
      href: 'start-workout'
    }
  },
  exercises: {
    title: 'Exercises',
    description: 'Browse, search, and manage your exercises',
    button: {
      icon: <Plus />,
      text: 'Add Exercise',
      href: 'add-exercise'
    }
  }
}

export function Header() {
  const { currentSegment } = useSegment()
  const header = getHeaderData[currentSegment]

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
              {header.button.icon}
              {header.button.text}
            </Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
