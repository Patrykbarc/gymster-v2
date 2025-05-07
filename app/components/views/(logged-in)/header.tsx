import { Play, Plus } from 'lucide-react'
import { Link, useMatches } from 'react-router'
import { Button } from '~/components/ui/button'

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
  '/dashboard': {
    title: 'Dashboard',
    description: 'Track your fitness journey and monitor your progress',
    button: {
      icon: <Play />,
      text: 'Start Workout',
      href: 'start-workout'
    }
  },
  '/dashboard/exercises': {
    title: 'Exercises',
    description: 'Browse, search, and manage your exercises',
    button: {
      icon: <Plus />,
      text: 'Add Exercise',
      href: 'exercises/new'
    }
  },
  '/dashboard/workout-plans': {
    title: 'Workout Plans',
    description: 'Create, edit, and manage your workout plans',
    button: {
      icon: <Plus />,
      text: 'Create Plan',
      href: 'workout-plans/new'
    }
  },
  '/dashboard/workout-plans/new': {
    title: 'New Workout Plan',
    description: 'Create a new workout plan'
  },
  '/dashboard/start-workout': {
    title: 'Start Workout',
    description: 'Begin a new workout session'
  }
}

export function Header() {
  const match = useMatches()
  const pathname = match[match.length - 1].pathname
  const current = match.find((match) => match.pathname === pathname)
  const header = current ? getHeaderData[current.pathname] : null

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
