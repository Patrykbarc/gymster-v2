import { Search } from 'lucide-react'
import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { ExerciseListTable } from '~/components/views/(logged-in)/exercises/exercise-list-table'
import { exercisesService } from '~/services/api/exercises/exercisesService'
import type { Database } from '~/types/database.types'

type ExerciseList = Database['public']['Tables']['exercises']['Row'][]

export async function loader({ request }: LoaderFunctionArgs) {
  const exercises: ExerciseList = await exercisesService.getExercises(request)

  return { exercises, request }
}

export default function Exercises() {
  const { exercises } = useLoaderData<typeof loader>()

  if (exercises.length === 0) {
    return (
      <div className="mt-10 flex h-full items-center justify-center">
        <p className="text-muted-foreground text-sm">
          No exercises found.{' '}
          <Link className="text-blue-500" to="new">
            Create your first exercise.
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Exercise Library</CardTitle>
          <CardDescription>
            Browse, search, and manage your exercises
          </CardDescription>
          <div className="relative mt-2">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search exercises..."
              className="w-full pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ExerciseListTable />
        </CardContent>
      </Card>
    </div>
  )
}
