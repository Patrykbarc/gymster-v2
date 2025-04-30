import { Play } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'

export function Header({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <nav className="flex h-fit w-full flex-col items-start justify-between gap-4 border-b p-6 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <Link to="/start-workout">
            <Play className="mr-2 h-4 w-4" />
            Start Workout
          </Link>
        </Button>
      </div>
    </nav>
  )
}
