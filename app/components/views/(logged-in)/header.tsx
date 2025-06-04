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
    description: 'Browse, search, and manage your exercises library',
    button: {
      icon: <Plus />,
      text: 'Add Exercise',
      href: 'exercises/new'
    }
  },
  '/dashboard/exercises/new': {
    title: 'New Exercise',
    description: 'Fill in the details for your new exercise',
    button: {
      icon: <Plus />,
      text: 'Add Exercise',
      href: 'exercises/new'
    }
  },
  '/dashboard/exercises/edit/:exerciseId': {
    title: 'Edit Exercise',
    description: 'Edit the details for your exercise'
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
  '/dashboard/workout-plans/edit/:id': {
    title: 'Edit Workout Plan',
    description: 'Edit the details for your workout plan'
  },
  '/dashboard/start-workout': {
    title: 'Start Workout',
    description: 'Begin a new workout session'
  }
}

export function Header() {
  const match = useMatches()
  const pathname = match[match.length - 1].pathname

  const header = Object.entries(getHeaderData).find(([pattern]) =>
    matchPath(pattern, pathname)
  )?.[1]

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

function matchPath(pattern: string, pathname: string): boolean {
  const patternParts = pattern.split('/')
  const pathParts = pathname.split('/')

  if (patternParts.length !== pathParts.length) {
    return false
  }

  return patternParts.every((part, index) => {
    if (part.startsWith(':')) {
      return true
    }
    return part === pathParts[index]
  })
}
