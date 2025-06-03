import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { Card, CardContent } from '~/components/ui/card'
import { ExerciseListTable } from '~/components/views/(logged-in)/exercises/exercise-list-table'
import { exercisesService } from '~/services/api/exercises/exercisesService'

export async function loader({ request }: LoaderFunctionArgs) {
  const exercises = await exercisesService.getExercises(request)

  return { exercises, request }
}

export default function Exercises() {
  const { exercises } = useLoaderData<typeof loader>()

  if (exercises?.length === 0) {
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
        <CardContent>
          <ExerciseListTable />
        </CardContent>
      </Card>
    </div>
  )
}
